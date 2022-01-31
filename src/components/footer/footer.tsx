import About from './about/about';
import Contacts from './contacts/contacts';
import Info from './info/info';
import Socials from './socials/socials';

export default function Footer():JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <a href="/" className="footer__logo logo">
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип"/>
        </a>
        <Socials />
        <About />
        <Info />
        <Contacts />
      </div>
    </footer>
  );
}
