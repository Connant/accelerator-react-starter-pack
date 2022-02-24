import dayjs from 'dayjs';
import { Comment } from '../../../../../types/types';
import Rating from '../rating/rating';
import 'dayjs/locale/ru';


type Props = {
  review: Comment
}

export default function Review({review}: Props): JSX.Element {


  const getFormatDate = (date: string) => dayjs(date).locale('ru').format('DD MMMM').toString();

  const date = getFormatDate(review.createAt);

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">
          {review.userName}
        </h4>
        <span className="review__date">
          {date}
        </span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

        <Rating rating={review.rating} />

        <span className="rate__count"></span><span className="rate__message"></span>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">
        {review.advantage}
      </p>

      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">
        {review.disadvantage}
      </p>

      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">
        {review.comment}
      </p>
    </div>
  );
}
