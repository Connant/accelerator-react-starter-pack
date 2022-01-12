
import Filter from './filter/filter';
import Sorting from './sorting/sorting';
import CardsList from '../card-list/cards-list';
import Header from '../header/header';
import Footer from '../footer/footer';

export default function CatalogPage ():JSX.Element {

  return (
    <div className="wrapper">
      <Header/>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="/">Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <Filter />
            <Sorting />
            <CardsList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
