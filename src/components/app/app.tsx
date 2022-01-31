/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, PAGINATION_DEFAULT_PAGE } from '../../const';
import CardPage from '../card-page/card-page';
import CartPage from '../cart-page/cart';
import CatalogPage from '../catalog-page/catalog-page';
import Error from '../error/error';

// https://habr.com/ru/company/kts/blog/598835/
// https://devsday.ru/blog/details/71441


export default function App(): JSX.Element {
  return (
    <Routes>

      <Route index element={<Navigate to={(AppRoute.ListPage).replace(':number', '1')} replace />} />

      <Route path={AppRoute.ListPage} element={<CatalogPage/>} />

      <Route path={AppRoute.CardPage} element={<CardPage/>} />

      <Route path={AppRoute.Cart} element={<CartPage/>} />

      <Route path='*' element={<Error />} />

    </Routes>
  );
}
