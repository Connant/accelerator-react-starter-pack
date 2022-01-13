
import IconRating from './icon-rating';
import { ratingList } from '../../utils';
import { GuitarType } from '../../types/guitar';
import { STAR_FULL_ICON, STAR_ICON } from '../../const';

type PropsType = {
  guitar: GuitarType;
};

export default function CardRating(props: PropsType): JSX.Element {

  const { guitar } = props;

  const starsCount= Math.trunc(guitar.rating);

  const starsList = ratingList.slice(starsCount).map((ratingValue) =>
    <IconRating key={ratingValue} iconClass={STAR_ICON} />,
  );

  const fullStarsList = ratingList.slice(0, starsCount).map((ratingValue) =>
    <IconRating key={ratingValue} iconClass={STAR_FULL_ICON} />,
  );

  return (
    <div className="rate product-card__rate" aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>

      {fullStarsList} {starsList}

      <span className="rate__count">{guitar.rating}</span>
      <span className="rate__message" />
    </div>
  );
}

