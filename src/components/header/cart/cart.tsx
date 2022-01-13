import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import SvgBasket from './svg-basket';

export default function Cart(): JSX.Element {
  return (
    <Link to={AppRoute.Cart} className="header__cart-link" aria-label="Корзина">
      <SvgBasket />
      <span className="visually-hidden">Перейти в корзину</span>
      <span className="header__cart-count">2</span>
    </Link>
  );
}
