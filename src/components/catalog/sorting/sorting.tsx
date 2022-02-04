import { useSelector, useDispatch } from 'react-redux';
import { OrderOption, SortingMethod } from '../../../const';
import { fetchSortedGuitars } from '../../../store/actions-api';
import { getSort } from '../../../store/selectors';

type Props = {
  page: number
}

export default function Sort({page}: Props):JSX.Element {
  const sorting = useSelector(getSort);
  const dispatch = useDispatch();
  const { sort, order } = sorting;

  const handleSort = (key: SortingMethod) => {
    const currentSort = {...sorting, sortKey: key};
    dispatch(fetchSortedGuitars(page, currentSort));
  };

  const handleOrder = (key: OrderOption) => {
    let currentSort = sorting;
    if (sort === '') {
      currentSort = {...currentSort, sort: SortingMethod.Price};
    }
    currentSort = {...currentSort, order: key};
    dispatch(fetchSortedGuitars(page, currentSort));
  };


  return (
    <div className='catalog-sort'>
      <h2 className='catalog-sort__title'>Сортировать:</h2>
      <div className='catalog-sort__type'>
        <button
          className={`catalog-sort__type-button ${(sort === SortingMethod.Price) ? 'catalog-sort__type-button--active' : ''}`}
          aria-label='по цене'
          tabIndex={-1}
          onClick={()=>handleSort(SortingMethod.Price)}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button ${(sort === SortingMethod.Rating) ? 'catalog-sort__type-button--active' : ''}`}
          aria-label='по популярности'
          onClick={()=>handleSort(SortingMethod.Rating)}
        >
          по популярности
        </button>
      </div>
      <div className='catalog-sort__order'>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up
          ${(order === OrderOption.Asc) ? 'catalog-sort__order-button--active' : ''}`}
          aria-label='По возрастанию'
          tabIndex={-1}
          onClick={()=>handleOrder(OrderOption.Asc)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down
          ${(order === OrderOption.Desc) ? 'catalog-sort__order-button--active' : ''}`}
          aria-label='По убыванию'
          onClick={()=>handleOrder(OrderOption.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

