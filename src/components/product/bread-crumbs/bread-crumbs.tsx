import { GuitarType } from '../../../types/types';


type Props = {
  guitar: GuitarType;
}

export default function BreadCrumbs({guitar}: Props): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item"><a className="link" href="/">Главная</a>
      </li>
      <li className="breadcrumbs__item"><a className="link" href="/">Каталог</a>
      </li>
      <li className="breadcrumbs__item"><a href="/" className="link">{guitar.name}</a>
      </li>
    </ul>
  );
}
