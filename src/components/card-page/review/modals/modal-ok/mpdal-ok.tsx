import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RemoveScroll } from 'react-remove-scroll';
import { closeAllModals, toggleIsSuccessOpen } from '../../../../../store/redusers/data-reducer/data-reducer';
import { getIsSuccessOpen } from '../../../../../store/selectors';
import { isEscEvent } from '../../../../../utils';
import FocusLock from 'react-focus-lock';


export default function ModalOk(): JSX.Element | null {
  const isOpen = useSelector(getIsSuccessOpen);
  const dispatch = useDispatch();

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

  const handleOnCloseClick = () => dispatch(toggleIsSuccessOpen(false));

  if (!isOpen) {
    return null;
  }

  return (
    <RemoveScroll>
      <FocusLock>
        <div className='modal is-active modal--success'>
          <div className='modal__wrapper'>
            <div className='modal__overlay' data-close-modal onClick={handleClick}>
            </div>
            <div className='modal__content'>
              <svg className='modal__icon' width='26' height='20' aria-hidden='true'>
                <use xlinkHref='#icon-success'></use>
              </svg>
              <p className='modal__message'>Спасибо за ваш отзыв!</p>
              <div className='modal__button-container modal__button-container--review'>
                <button className='button button--small modal__button modal__button--review' onClick={handleOnCloseClick}>
                  К покупкам!
                </button>
              </div>
              <button
                className='modal__close-btn button-cross'
                type='button'
                aria-label='Закрыть'
                onClick={handleOnCloseClick}
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

