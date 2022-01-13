import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppRoute, REQUEST_DELAY } from '../../const';
import { loadGuitarsSuccess, loadSearchResults } from '../../store/action';
import { searchGuitarsWithParams } from '../../store/actions-api';
import { getGuitarsList, getSearchGuitars } from '../../store/selectors';
import debounce from 'lodash.debounce';
import ButtonSearch from './button-search/button-search';


export default function SearchBox(): JSX.Element {
  const guitarsList = useSelector(getGuitarsList);
  const searchGuitars = useSelector(getSearchGuitars);

  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const setDebounceSearch = debounce(() => setSearch(search), REQUEST_DELAY);


  useEffect(() => {
    if (search !== '') {
      dispatch(searchGuitarsWithParams(search));
    }
  }, [search, dispatch]);

  const handleClick = (id: string) => {
    history.push(AppRoute.CardPage.replace(':id', `${id}`));
    setSearch('');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    if (!isFocused) {
      setSearch('');
      dispatch(loadGuitarsSuccess(guitarsList));
    }
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setSearch(value);
    setDebounceSearch();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);

    if (!isHovered) {
      setSearch('');
      dispatch(loadSearchResults([]));
    }
  };

  return (
    <div className="form-search" data-testid="form-search">
      <form className="form-search__form">

        <ButtonSearch />

        <input className="form-search__input"
          onChange={handleInputChange}
          value={search}
          onFocus={handleFocus}
          onBlur={handleBlur}
          id="search" type="text"
          autoComplete="off" placeholder="что вы ищите?"
        />
        <label className="visually-hidden" htmlFor="search">
          Поиск
        </label>
      </form>

      {(searchGuitars.length > 0 && (isFocused || isHovered)) && (
        <ul
          className="form-search__select-list"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {searchGuitars.map((guitar) => (
            <li className="form-search__select-item"
              tabIndex={0} key={guitar.id}
              onClick={() => handleClick(guitar.id)}
            >
              {guitar.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


