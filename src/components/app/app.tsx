import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import CardPage from '../pages/card-page';
import CartPage from '../pages/cart-page';
import Error from '../error/error';
import Main from '../pages/main';

// https://habr.com/ru/company/kts/blog/598835/
// https://devsday.ru/blog/details/71441


export default function App(): JSX.Element {
  return (
    <Routes>

      <Route index element={<Navigate to={(AppRoute.ListPage).replace(':number', '1')} replace />} />

      <Route path={AppRoute.ListPage} element={<Main />} />

      <Route path={AppRoute.CardPage} element={<CardPage />} />

      <Route path={AppRoute.Cart} element={<CartPage />} />

      <Route path='*' element={<Error />} />

    </Routes>
  );
}
