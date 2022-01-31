/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Filter from './filter/filter';
import Sorting from './sorting/sorting';
import CardsList from '../card-list/cards-list';
import Header from '../header/header';
import Footer from '../footer/footer';
import BreadCrumbs from './bread-crumbs/bread-crumbs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredGuitars, fetchGuitarsPrice } from '../../store/actions-api';
import { removeFilter, removeSort } from '../../store/redusers/client-reducer';
import { getGuitarFilter, getGuitarsShow } from '../../store/selectors';
import Pagination from '../pagination/pagination';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CatalogPage ():JSX.Element {
  const guitars = useSelector(getGuitarsShow);
  const filter = useSelector(getGuitarFilter);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const dispatch = useDispatch();
  const { number } = useParams();
  const page = Number(number);

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
    const searchRequest = true;
    dispatch(fetchGuitarsPrice());
    console.log(page);
    dispatch(fetchFilteredGuitars(currentFilter, page, searchRequest));

    return () => {
      dispatch(removeFilter());
      dispatch(removeSort());
    };
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
    <div className="wrapper">
      <Header/>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <BreadCrumbs />
          <div className="catalog">
            <Filter page={page} />
            <Sorting page={page} />
            <CardsList guitars={guitars} />
            <Pagination page={page} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
