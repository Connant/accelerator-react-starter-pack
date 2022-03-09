import { AppRoute } from '../../../const';


export default function BreadCrumbs (): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
      <li className="breadcrumbs__item"><a className="link" href="/">Главная</a>
      </li>
      <li className="breadcrumbs__item"><a className="link" href="/">Каталог</a>
      </li>
      <li className="breadcrumbs__item"><a className="link" href={AppRoute.Cart}>Корзина</a>
      </li>
    </ul>
  );
}
