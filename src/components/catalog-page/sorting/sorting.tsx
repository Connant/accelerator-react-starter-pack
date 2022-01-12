import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGuitarsAction } from '../../../store/actions-api';
import { selectSortOrder, selectSortType } from '../../../store/selectors';
import { setSortOrder, setSortingMethod } from '../../../store/action';
import { OrderOption, SortingMethod } from '../../../const';
import cn from 'classnames';

export default function CatalogSort(): JSX.Element {
  const sortType = useSelector(selectSortType);
  const sortOrder = useSelector(selectSortOrder);

  const location = useLocation();
  const dispatch = useDispatch();

  const parameters = new URLSearchParams(location.search);

  const sortParams = parameters.get('_sort');
  const orderParams = parameters.get('_order');

  useEffect(() => {
    if (
      (sortOrder !== '' && sortOrder !== orderParams)
        ||
      (sortOrder !== '' && sortType !== sortParams)) {

      const queryProp = {
        _sort: sortType,
        _order: sortOrder,
      };

      dispatch(fetchGuitarsAction(queryProp));
    }
  });

  const getSortingButtonActive = (sortOption: SortingMethod) =>
    cn(
      'catalog-sort__type-button',
      {'catalog-sort__type-button--active': sortType === sortOption},
    );

  const getSortingOrderButtonActive = (sortOption: OrderOption) =>
    cn(
      'catalog-sort__order-button',
      {'catalog-sort__order-button--up': OrderOption.Asc === sortOption},
      {'catalog-sort__order-button--down': OrderOption.Desc === sortOption},
      {'catalog-sort__order-button--active': sortOrder === sortOption},
    );

  const getSortingType = (sortOption: SortingMethod): number => sortOption === sortType ? -1 : 0;
  const getSortingOrder = (sortOption: OrderOption): number => sortOption === sortOrder ? -1 : 0;

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">

        <button className={getSortingButtonActive(SortingMethod.Price)}
          aria-label="По цене" tabIndex={getSortingType(SortingMethod.Price)}
          onClick={() => dispatch(setSortingMethod(SortingMethod.Price))}
        >
          по цене
        </button>

        <button className={getSortingButtonActive(SortingMethod.Rating)}
          aria-label="По популярности" tabIndex={getSortingType(SortingMethod.Rating)}
          onClick={() => dispatch(setSortingMethod(SortingMethod.Rating))}
        >
          по популярности
        </button>

      </div>
      <div className="catalog-sort__order">

        <button  className={getSortingOrderButtonActive(OrderOption.Asc)}
          aria-label="По возрастанию" tabIndex={getSortingOrder(OrderOption.Asc)}
          onClick={() => dispatch(setSortOrder(OrderOption.Asc))}
        >
        </button>

        <button className={getSortingOrderButtonActive(OrderOption.Desc)}
          aria-label="По убыванию" tabIndex={getSortingOrder(OrderOption.Desc)}
          onClick={() => dispatch(setSortOrder(OrderOption.Desc))}
        >
        </button>

      </div>
    </div>
  );
}
