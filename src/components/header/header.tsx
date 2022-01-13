import SearchBox from '../search-box/search-box';
import Logo from './logo/logo';
import Navigation from './navigation/navigation';
import Cart from './cart/cart';

export default function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Logo />
        <Navigation />
        <SearchBox />
        <Cart />
      </div>
    </header>
  );
}
