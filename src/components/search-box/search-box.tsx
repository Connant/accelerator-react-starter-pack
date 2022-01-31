/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, FormEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { REQUEST_DELAY } from '../../const';
import { fetchGuitarsSearch } from '../../store/actions-api';
import { clearGuitarssSearch } from '../../store/redusers/data-reducer';
import { setSearchKey, resetSearchKey } from '../../store/redusers/client-reducer';
import { getCurrentGuitar, getGuitarsSearch, getSearchKey } from '../../store/selectors';
import { ThunkActionResult } from '../../types/actions';
import { useDebounced } from '../../hooks/use-debounced';

export type CallbackType = (thunkAction:ThunkActionResult<Promise<void>>) => void;

function FormSearch(): JSX.Element {
  const guitars = useSelector(getCurrentGuitar);
  const guitarsSearch = useSelector(getGuitarsSearch);
  const searchKey = useSelector(getSearchKey);
  const dispatch = useDispatch();
  const debouncedSearch = useDebounced(dispatch, REQUEST_DELAY);

  useEffect(() => {
    if (searchKey !== '') {
      debouncedSearch(fetchGuitarsSearch(searchKey));
    }
  }, [debouncedSearch, dispatch, searchKey]);

  const handleClick = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === '') {
      dispatch(clearGuitarssSearch());
    } dispatch(setSearchKey(evt.target.value));
  };

  const handleItemClick = () => {
    dispatch(resetSearchKey());
  };

  const handleKeyPress = (evt: { key: string; }) => {
    if (evt.key === 'Enter') {
      dispatch(resetSearchKey());
    }
  };

  return (
    <div className='form-search'>
      <form className='form-search__form' onSubmit={(evt: FormEvent<HTMLFormElement>) => {evt.preventDefault();}}>

        <button className='form-search__submit' type='submit'>
          <svg className='form-search__icon' width='14' height='15' aria-hidden='true'>
            <use xlinkHref='#icon-search'></use>
          </svg>
          <span className='visually-hidden'>Начать поиск</span>
        </button>

        <input className='form-search__input' id='search' value={searchKey} type='text' autoComplete='off' placeholder='Что вы ищите?'
          onChange={handleClick}
        />

        <label className='visually-hidden' htmlFor='search'>
          Поиск
        </label>

      </form>
      <ul className={`form-search__select-list ${guitarsSearch.length ? '' : 'hidden'}`} style={{zIndex:1}} >

        {guitarsSearch?.map((guitar) => {
          const { name } = guitar;
          return(
            <li className='form-search__select-item' tabIndex={0} key={name}
              onClick={handleItemClick} onKeyPress={handleKeyPress}
            >
              { name };
            </li>
          );})}
      </ul>
    </div>
  );
}

export default FormSearch;
