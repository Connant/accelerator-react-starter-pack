/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
// https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react-ru

import { MouseEvent, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation, generatePath } from 'react-router-dom';
import { AppRoute, nextPage, backPage, NUMBER_OF_CARDS, PAGINATION_DEFAULT_PAGE, ALL_GUITARS, FilterState } from '../../const';
import cn from 'classnames';
import { addGuitarssShow } from '../../store/redusers/data-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { CompleteGuitar } from '../../types/types';
import { fetchFilteredGuitars } from '../../store/actions-api';
import { getGuitarFilter } from '../../store/selectors';

type Props = {
  page: number,
}

export default function Pagination({page}: Props): JSX.Element {
  const filter = useSelector(getGuitarFilter);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  // console.log(page);

  const pageCount = Math.ceil(ALL_GUITARS / NUMBER_OF_CARDS);


  const handleClick = (evt: MouseEvent<HTMLAnchorElement>, numberPage?: number) => {
    evt.preventDefault();
    let targetNumberPage;

    if (evt.currentTarget.innerText === nextPage) {
      targetNumberPage = Number(page) + 1;
    } else if (evt.currentTarget.innerText === backPage) {
      targetNumberPage = Number(page) - 1;
    } else {
      targetNumberPage = numberPage;
    }

    const numberPagePath = `${targetNumberPage}`;

    const queryParams = new URLSearchParams(window.location.search);

    navigation(`${(AppRoute.ListPage).replace(':number', numberPagePath)}?${queryParams}`);
    console.log(filter);
    console.log(`targetNumberPage=${targetNumberPage}`);
    const searchRequest = true;
    dispatch(fetchFilteredGuitars(filter, targetNumberPage || page, searchRequest));
  };

  return (
    <div className="pagination page-content__pagination">

      <ul className="pagination__list">
        {Number(page) !== PAGINATION_DEFAULT_PAGE && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link to={String(PAGINATION_DEFAULT_PAGE)} onClick={handleClick} className="link pagination__page-link">
              {backPage}
            </Link>
          </li>
        )}

        {Array.from({length: pageCount}, (_, el) => el + PAGINATION_DEFAULT_PAGE).map((el) => {
          const activePage = cn('pagination__page', {
            'pagination__page--active': Number(page) === el,
          });
          // console.log(el);

          return (
            <li key={el} className={activePage}>
              <Link to={String(el)} onClick={(evt) => handleClick(evt, el)} className="link pagination__page-link">
                {el}
              </Link>
            </li>
          );
        })}

        {Number(page) < pageCount && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link to={String(pageCount)} onClick={handleClick} className="link pagination__page-link" >
              {nextPage}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

