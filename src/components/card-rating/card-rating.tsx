/* eslint-disable no-console */
import IconRating from './icon-rating';
import { createRangeList } from '../../utils';
import { RATING_STARS_COUNT, RATING_STARTS_WITH, STAR_FULL_ICON, STAR_ICON } from '../../const';

type Props = {
  rating: number;
};

export default function CardRating({ rating }: Props): JSX.Element {

  const ratingList = createRangeList(RATING_STARTS_WITH, RATING_STARS_COUNT);

  const starsCount= Math.trunc(rating);

  const stars = ratingList.slice(starsCount).map((i) =>
    <IconRating key={i} iconClass={STAR_ICON} />,
  );

  const fullStars = ratingList.slice(0, starsCount).map((i) =>
    <IconRating key={i} iconClass={STAR_FULL_ICON} />,
  );

  return (
    <div className="rate product-card__rate" aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>
      {fullStars} {stars}
      <span className="rate__count">{rating}</span>
      <span className="rate__message" />
    </div>
  );
}

