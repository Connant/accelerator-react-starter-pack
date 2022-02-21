// https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react-ru
import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { fetchFilteredGuitars } from '../../../store/actions-api';
import { getGuitarFilter, getGuitarCount } from '../../../store/selectors';
import { AppRoute, nextPage, backPage, NUMBER_OF_CARDS, PAGINATION_DEFAULT_PAGE } from '../../../const';

type Props = {
  page: number,
}

export default function Pagination({page}: Props): JSX.Element {
  const filter = useSelector(getGuitarFilter);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const guitarCount = useSelector(getGuitarCount);

  if (guitarCount === null) {
    return null;
  }

  const pageCount = Math.ceil(guitarCount / NUMBER_OF_CARDS);

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
    dispatch(fetchFilteredGuitars(filter, targetNumberPage || page, true));
  };

  return (
    <div className="pagination page-content__pagination">

      <ul className="pagination__list">
        {Number(page) !== PAGINATION_DEFAULT_PAGE && (
          <li className="pagination__page pagination__page--prev" id="prev" data-testid='Назад'>
            <Link to={String(PAGINATION_DEFAULT_PAGE)} onClick={handleClick} className="link pagination__page-link">
              Назад
            </Link>
          </li>
        )}

        {Array.from({length: pageCount}, (_, el) => el + PAGINATION_DEFAULT_PAGE).map((el) => {
          const activePage = cn('pagination__page', {
            'pagination__page--active': Number(page) === el,
          });

          if (guitarCount <= el) {
            return null;
          }

          return (
            <li data-testid="pagination" key={el} className={activePage}>
              <Link to={String(el)} onClick={(evt) => handleClick(evt, el)} className="link pagination__page-link">
                {el}
              </Link>
            </li>
          );
        })}

        {Number(page) < pageCount && (
          <li className="pagination__page pagination__page--next" id="next" data-testid="Далее">
            <Link to={String(pageCount)} onClick={handleClick} className="link pagination__page-link" >
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

