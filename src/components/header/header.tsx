import SearchBox from '../search-box/search-box';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import SvgBasket from './cart/svg-basket';

export default function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className='header__logo logo' to={AppRoute.Main}>
          <img
            className='logo__img'
            width='70'
            height='70'
            src='/img/svg/logo.svg'
            alt='Логотип'
          />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <a className="link main-nav__link link--current" href="/">Каталог</a>
            </li>
            <li>
              <a className="link main-nav__link" href="/">Где купить?</a>
            </li>
            <li>
              <a className="link main-nav__link" href="/">О компании</a>
            </li>
          </ul>
        </nav>
        <SearchBox />
        <Link to={AppRoute.Cart} className="header__cart-link" aria-label="Корзина">
          <SvgBasket />
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}
