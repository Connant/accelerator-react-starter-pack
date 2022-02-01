import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { FilterState } from '../../const';
import { CompleteGuitar } from '../../types/types';
import { fetchFilteredGuitars, fetchGuitarsPrice } from '../../store/actions-api';

import { toast } from 'react-toastify';
import queryString from 'query-string';
import 'react-toastify/dist/ReactToastify.css';

import BreadCrumbs from './bread-crumbs/bread-crumbs';
import Sorting from './sorting/sorting';
import Filter from './filter/filter';
import CardsList from '../card-list/cards-list';
import Pagination from '../pagination/pagination';

type Props = {
  guitars: CompleteGuitar[],
  filter: FilterState,
  page: number,
}

export default function Catalog({guitars, filter, page}: Props): JSX.Element {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const dispatch = useDispatch();
  const priceMin = searchParams.get('price_min') || '';
  const priceMax = searchParams.get('price_lte') || '';
  const type = searchParams.getAll('type') || [];
  const stringCount = searchParams.getAll('stringCount') || [];

  useEffect(() => {
    let currentFilter = filter;

    if (priceMin !== '') {
      currentFilter = { ...currentFilter, minPrice: priceMin };
    } else {
      toast.error('Что-то пошло не так...', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (priceMax !== '') {
      currentFilter = { ...currentFilter, maxPrice: priceMax };
    } else {
      toast.error('Что-то пошло не так...', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (type.length !== 0) {
      currentFilter = { ...currentFilter, guitarTypes: type };
    } else {
      toast.error('Что-то пошло не так...', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (stringCount.length !== 0) {
      currentFilter = { ...currentFilter, stringCounts: stringCount };
    } else {
      toast.error('Что-то пошло не так...', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    dispatch(fetchGuitarsPrice());
    // console.log(page);
    dispatch(fetchFilteredGuitars(currentFilter, page, true));
  }, []);

  useEffect(() => {
    const paramsSearch = queryString.stringify({
      'price_gte': filter.minPrice,
      'price_lte': filter.maxPrice,
      'type': filter.guitarTypes,
      'stringCount': filter.stringCounts,
    });
    setSearchParams(paramsSearch);
  }, []);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <BreadCrumbs />
        <div className="catalog">
          <Filter page={page} filter={filter} />
          <Sorting page={page} />
          <CardsList guitars={guitars} />
          <Pagination page={page} />
        </div>
      </div>
    </main>
  );
}