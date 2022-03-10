import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { GuitarType } from '../../../types/types';


type Props = {
  guitar: GuitarType;
}

export default function BreadCrumbs({guitar}: Props): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
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
        <a className="link" href='#' >
          {guitar.name}
        </a>
      </li>
    </ul>
  );
}
