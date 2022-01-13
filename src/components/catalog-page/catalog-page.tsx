
import Filter from './filter/filter';
import Sorting from './sorting/sorting';
import CardsList from '../card-list/cards-list';
import Header from '../header/header';
import Footer from '../footer/footer';
import BreadCrumbs from './bread-crumbs/bread-crumbs';

export default function CatalogPage ():JSX.Element {

  return (
    <div className="wrapper">
      <Header/>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <BreadCrumbs />
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
