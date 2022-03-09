import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';
import { useMatch, useNavigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { toggleIsCartSuccessOpen, resetTempItemCart, closeAllModals } from '../../../store/redusers/data-reducer/data-reducer';
import { getIsCartSuccessOpen } from '../../../store/selectors';


export default function ModalCartOk(): JSX.Element | null {
  const isOpen = useSelector(getIsCartSuccessOpen);
  const dispatch = useDispatch();
  const isCatalogPage = useMatch(AppRoute.ListPage);
  const navigate = useNavigate();
  const location = useLocation();

  const navigatePathname = useMemo(() => {
    const state = location.state as { from: string };
    if (state && state.from) {
      return state.from;
    }
    return AppRoute.Main;
  }, [location]);

  const handleOnCloseClick = () => dispatch(toggleIsCartSuccessOpen(false));

  const handleOnCartBtnClick = () => {
    dispatch(toggleIsCartSuccessOpen(false));
    navigate(AppRoute.Cart);
  };
  const handleOnResumeBtnClick = () => {
    dispatch(toggleIsCartSuccessOpen(false));
    if (!isCatalogPage) {
      navigate(`${navigatePathname}`);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <RemoveScroll>
      <FocusLock>
        <div className='modal is-active modal--success'>
          <div className='modal__wrapper'>
            <div
              className='modal__overlay'
              data-close-modal
              onClick={() => {
                dispatch(resetTempItemCart());
                dispatch(toggleIsCartSuccessOpen(false));
                dispatch(closeAllModals());
              }}
            >
            </div>
            <div className='modal__content'>
              <svg className='modal__icon' width='26' height='20' aria-hidden='true'>
                <use xlinkHref='#icon-success'></use>
              </svg>
              <p className='modal__message'>Товар успешно добавлен в корзину</p>
              <div className='modal__button-container modal__button-container--add'>
                <button
                  onClick={handleOnCartBtnClick}
                  className='button button--small modal__button'
                >
                  Перейти в корзину
                </button>
                <button
                  onClick={handleOnResumeBtnClick}
                  className='button button--black-border button--small modal__button modal__button--right'
                >
                  Продолжить покупки
                </button>
              </div>
              <button
                className='modal__close-btn button-cross'
                type='button'
                aria-label='Закрыть'
                onClick={handleOnCloseClick}
                data-testid='modalCloseBtn'
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
