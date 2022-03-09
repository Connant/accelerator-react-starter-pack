import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCommentsCounter, resetCommentsCounter } from '../../../store/redusers/data-reducer/data-reducer';
import { getSortedComments, getCommentsCounter } from '../../../store/selectors';
import NewReview from './new-review/new-review';
import Review from './review/review/review';


export default function ReviewSection(): JSX.Element {
  const currentComments = useSelector(getSortedComments);
  const commentsCounter = useSelector(getCommentsCounter);
  const dispatch = useDispatch();

  const reviewTitile = currentComments.length === 0 ? 'Отзывов ещё нет' : 'Отзывы';

  useEffect(() => () => {
    dispatch(resetCommentsCounter());
  }, [dispatch]);

  return(
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">
        {reviewTitile}
      </h3>

      <NewReview />

      {currentComments.slice(0, commentsCounter).map((comment) => (
        <Review key={comment.id} review={comment} />
      ))}

      {commentsCounter < currentComments.length && (
        <button
          className='button button--medium reviews__more-button'
          onClick={() => dispatch(incrementCommentsCounter())}
        >
        Показать еще отзывы
        </button>
      )}

      {
        currentComments.length !==0 &&
      <a
        className='button button--up button--red-border button--big reviews__up-button'
        style={{zIndex: 1000}}
        href='#header'
        onClick={(evt) => {
          evt.preventDefault();
          window.scrollTo(0, 0);
        }}
      >
      Наверх
      </a>
      }


    </section>
  );
}
