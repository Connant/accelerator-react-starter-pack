import SearchBox from '../search-box/search-box';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import SvgBasket from './cart/svg-basket';
import { useSelector } from 'react-redux';
import { getTotalInCart } from '../../store/selectors';

export default function Header(): JSX.Element {
  const totalInCart = useSelector(getTotalInCart);

  const { pathname } = useLocation();

  const HeaderLinks = new Map([
    ['catalog', { title: 'Каталог', link: AppRoute.Main}],
    ['where', { title: 'Где купить?', link: AppRoute.Error}],
    ['about', { title: 'О компании', link: AppRoute.Error}],
  ]);

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
          <ul className='main-nav__list'>
            {[...HeaderLinks.keys()].map((headerLink) => {
              const link = HeaderLinks.get(headerLink)?.link;
              const title = HeaderLinks.get(headerLink)?.title;
              const isActiveLink = pathname.includes(headerLink);
              return (
                <li key={headerLink}>
                  <Link
                    className={`link main-nav__link ${
                      isActiveLink ? 'link--current' : ''
                    }`}
                    to={link}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <SearchBox />
        <Link to={AppRoute.Cart} className="header__cart-link" aria-label="Корзина">
          <SvgBasket />
          <span className="visually-hidden">Перейти в корзину</span>
          {!!totalInCart && (
            <span className='header__cart-count'>{totalInCart}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
