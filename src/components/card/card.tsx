import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { CompleteGuitar } from '../../types/types';
import { replaceImagePath } from '../../utils';
import CardRating from '../card-rating/card-rating';

type Props = {
  guitar: CompleteGuitar;
};

export default function Card({ guitar }: Props): JSX.Element {

  return (
    <div className='product-card'>

      <img src={replaceImagePath(guitar.previewImg)} width='75' height='190' alt={guitar.name} />

      <div className='product-card__info'>

        <div className='rate product-card__rate' aria-hidden='true'>
          <CardRating comments={guitar.comments?.length} rating={guitar.rating}/>
        </div>

        <p className='product-card__title'>{guitar.name}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>
          {guitar.price} ₽
        </p>

      </div>

      <div className='product-card__buttons'>
        <Link className='button button--mini' to={AppRoute.CardPage}>
          Подробнее
        </Link>
        <a href='/' className='button button--red button--mini button--add-to-cart'>
          Купить
        </a>
      </div>

    </div>
  );
}

