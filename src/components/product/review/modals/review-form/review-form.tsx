/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';
import { postComment } from '../../../../../store/actions-api';
import { closeAllModals, toggleIsReviewOpen } from '../../../../../store/redusers/data-reducer/data-reducer';
import { getCurrentGuitar, getIsReviewOpen } from '../../../../../store/selectors';
import { CommentData } from '../../../../../types/types';
import { isEscEvent } from '../../../../../utils';
import { STAR_NUMBERS, StarTitle } from '../../../../../const';
import './review-form.css';


export default function ReviewForm(): JSX.Element | null {
  const dispatch = useDispatch();
  const isOpen = useSelector(getIsReviewOpen);
  const guitar = useSelector(getCurrentGuitar);

  const handleOnCloseClick = () => dispatch(toggleIsReviewOpen(true));

  const handleClick = () => {
    dispatch(closeAllModals());
  };

  const handleKeydown = (evt: KeyboardEvent) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      dispatch(closeAllModals());
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm<CommentData>({
    mode: 'onBlur',
    defaultValues: {
      userName: '',
      advantage: '',
      disadvantage: '',
      comment: '',
      rating: 0,
    },
  });

  const onSubmit: SubmitHandler<CommentData> = (comment) => {
    dispatch(postComment({...comment, guitarId: guitar.id, rating: Number(comment.rating)}));
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) {
    return null;
  }

  return (
    <RemoveScroll>
      <FocusLock>
        <div className='modal is-active modal--review'>
          <div className='modal__wrapper'>
            <div className='modal__overlay' data-close-modal onClick={handleClick}>
            </div>
            <div className='modal__content'>
              <h2 className='modal__header modal__header--review title title--medium'>
                Оставить отзыв
              </h2>
              <h3 className='modal__product-name title title--medium-20 title--uppercase'>
                {guitar?.name}
              </h3>
              <form className='form-review' onSubmit={handleSubmit(onSubmit)}>
                <div className='form-review__wrapper'>
                  <div className='form-review__name-wrapper'>
                    <label data-testid='userName' className='form-review__label form-review__label--required' htmlFor='user-name'>
                      Ваше Имя
                    </label>
                    <input
                      className='form-review__input form-review__input--name'
                      id='user-name'
                      type='text'
                      autoComplete='off'
                      {...register('userName', {
                        required: true,
                      })}
                    />
                    <span className='form-review__warning' style={{ visibility: errors.userName ? 'visible' : 'hidden' }}>
                      Заполните поле
                    </span>
                  </div>
                  <div>
                    <span className='form-review__label form-review__label--required'>
                      Ваша Оценка
                    </span>
                    <div className='new-rate'>
                      {[...STAR_NUMBERS].map((starNumber)=> (
                        <React.Fragment key = {starNumber}>
                          <input
                            data-testid='star'
                            className='visually-hidden new-rate_input'
                            style={{order:starNumber}}
                            type='radio'
                            id={`star-${starNumber}`}
                            value = {starNumber}
                            {...register('rating', {required: true, value: starNumber})}
                          />
                          <label
                            className='new-rate__label'
                            htmlFor={`star-${starNumber}`}
                            title={StarTitle[starNumber]}
                          >
                          </label>
                        </React.Fragment>
                      ))}
                      <span className='rate__count'></span>
                      <span className='rate__message' style={{ visibility: errors.rating ? 'visible' : 'hidden' }}>
                        Поставьте оценку
                      </span>
                    </div>
                  </div>
                </div>
                <div className='form-review__other-wrapper'>
                  <label className='form-review__label form-review__label--required' htmlFor='user-name'>
                    Достоинства
                  </label>
                  <input
                    data-testid='advantage'
                    className='form-review__input form-review__input-other'
                    id='pros'
                    type='text'
                    autoComplete='off'
                    {...register('advantage', {required: true})}
                  />
                  <span className='form-review__warning form-review__other-warning' style={{ visibility: errors.advantage ? 'visible' : 'hidden' }}>
                      Заполните поле
                  </span>
                </div>
                <div className='form-review__other-wrapper'>
                  <label className='form-review__label form-review__label--required' htmlFor='user-name'>
                    Недостатки
                  </label>
                  <input
                    data-testid='disadvantage'
                    className='form-review__input form-review__input-other'
                    id='user-name'
                    type='text'
                    autoComplete='off'
                    {...register('disadvantage', {required: true})}
                  />
                  <span className='form-review__warning form-review__other-warning' style={{ visibility: errors.disadvantage ? 'visible' : 'hidden' }}>
                    Заполните поле
                  </span>
                </div>
                <div className='form-review__other-wrapper'>
                  <label className='form-review__label form-review__label--required' htmlFor='user-name'>
                    Комментарий
                  </label>
                  <textarea
                    data-testid='comment'
                    className='form-review__input form-review__input--textarea form-review__input-other'
                    id='user-name'
                    rows={10}
                    autoComplete='off'
                    {...register('comment', {
                      required: true,
                    })}
                  >
                  </textarea>
                  <span className='form-review__warning form-review__other-warning' style={{ visibility: errors.comment ? 'visible' : 'hidden' }}>
                      Заполните поле
                  </span>
                </div>
                <button className='button button--medium-20 form-review__button' type='submit'>
                  Отправить отзыв
                </button>
              </form>
              <button
                data-testid='button'
                className='modal__close-btn button-cross'
                type='button'
                aria-label='Закрыть'
                onClick={handleClick}
              >
                <span className='button-cross__icon'></span>
                <span className='modal__close-btn-interactive-area'></span>
              </button>
            </div>
          </div>
        </div>
      </FocusLock>
    </RemoveScroll>
  );
}
