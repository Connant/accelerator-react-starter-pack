import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';


export default function BreadCrumbs (): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.ListPage}>
          Главная
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.ListPage}>
          Каталог
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Cart}>
          Корзина
        </Link>
      </li>
    </ul>
  );
}
