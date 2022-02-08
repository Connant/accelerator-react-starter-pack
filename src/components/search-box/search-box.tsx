import { useEffect, FormEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGuitarsSearch } from '../../store/actions-api';
import { clearGuitarssSearch } from '../../store/redusers/data-reducer';
import { searchCriteria, researchCriteria } from '../../store/redusers/client-reducer';
import { getGuitarsSearch, GetSearchCriteria } from '../../store/selectors';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function SearchBox(): JSX.Element {
  const guitarsSearch = useSelector(getGuitarsSearch);
  const search = useSelector(GetSearchCriteria);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === '' && evt.target.value !== undefined) {
      dispatch(clearGuitarssSearch());
    } dispatch(searchCriteria(evt.target.value));
  };

  const handleKeyPress = (evt: {key: string}) => {
    if (evt.key === 'Enter') {
      dispatch(researchCriteria());
    }
  };

  useEffect(() => {
    if (search !== '' && search !== undefined) {
      dispatch(fetchGuitarsSearch(search));
    }
  }, [ dispatch, search]);

  return (
    <div className='form-search'>
      <form className='form-search__form' onSubmit={(evt: FormEvent<HTMLFormElement>) => {evt.preventDefault();}}>

        <button className='form-search__submit' type='submit'>
          <svg className='form-search__icon' width='14' height='15' aria-hidden='true'>
            <use xlinkHref='#icon-search'></use>
          </svg>
          <span className='visually-hidden'>Начать поиск</span>
        </button>

        <input className='form-search__input' id='search' value={search} type='text' autoComplete='off' placeholder='Что вы ищите?'
          onChange={handleClick}
        />

        <label className='visually-hidden' htmlFor='search'>
          Поиск
        </label>

      </form>
      <ul className={`form-search__select-list ${guitarsSearch.length ? '' : 'hidden'}`} style={{zIndex:1}} >

        {guitarsSearch?.map((guitar) => {
          const {name, id} = guitar;
          const path = generatePath((AppRoute.CardPage).replace(':id', id.toString()));
          return(
            <li className='form-search__select-item' tabIndex={0} key={name}
              onClick={() => {navigate(`/${path}`); dispatch(researchCriteria());}} onKeyPress={handleKeyPress}
            >
              {name};
            </li>
          );})}
      </ul>
    </div>
  );
}

