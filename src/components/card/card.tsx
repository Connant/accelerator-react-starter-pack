import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { GuitarType } from '../../types/guitar';
import { replaceImagePath } from '../../utils';
import CardRating from '../card-rating/card-rating';

type GuitarCardProps = {
  guitar: GuitarType;
};

export default function GuitarCard( props: GuitarCardProps ): JSX.Element {
  const { guitar } = props;

  return (
    <div className="product-card">

      <img src={replaceImagePath(guitar.previewImg)} width="75" height="190" alt={guitar.name}/>

      <div className="product-card__info">

        <CardRating guitar={guitar} />

        <p className="product-card__title">{guitar.name}</p>

        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar.price} ₽</p>

      </div>

      <div className="product-card__buttons">
        <Link to={AppRoute.CardPage} className="button button--mini">
          Подробнее
        </Link>
        <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>

      </div>
    </div>
  );
}

