import { useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { getInCart } from '../../../../store/selectors';
import { CompleteGuitar } from '../../../../types/types';
import { prettify, replaceImagePath } from '../../../../utils';
import CardRating from '../../../card-rating/card-rating';
import AddButton from './buttons/add-button';
import InButton from './buttons/in-button';

type Props = {
  guitar: CompleteGuitar;
};

export default function Card({guitar}: Props): JSX.Element {
  const inCart = useSelector(getInCart);

  const path = generatePath((AppRoute.CardPage).replace(':id', guitar.id.toString()));

  return (
    <div className='product-card'>

      <img src={replaceImagePath(guitar.previewImg)} width='75' height='190' alt={guitar.name} />

      <div className='product-card__info'>

        <div className='rate product-card__rate' aria-hidden='true'>
          <CardRating rating={guitar.rating}/>
        </div>

        <p className='product-card__title'>{guitar.name}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>
          {prettify(guitar.price)} ₽
        </p>

      </div>

      <div className='product-card__buttons'>
        <Link className='button button--mini' to={`/${path}`}>
          Подробнее
        </Link>
        {guitar.id in inCart ? <InButton /> : <AddButton product={guitar} />}
      </div>

    </div>
  );
}

