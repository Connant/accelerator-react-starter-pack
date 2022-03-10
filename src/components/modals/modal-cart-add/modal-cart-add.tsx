/* eslint-disable no-console */
import { useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarsType } from '../../../const';
import { addToCart } from '../../../store/redusers/client-reduser/client-reducer';
import { closeAllModals, resetTempItemCart, toggleIsCartAddOpen, toggleIsCartSuccessOpen } from '../../../store/redusers/data-reducer/data-reducer';
import { getTempItemCart, getIsCartAddOpen } from '../../../store/selectors';
import { isEscEvent, prettify } from '../../../utils';


export default function ModalCartAdd(): JSX.Element | null {
  const { id, name, vendorCode, type, previewImg, stringCount, price } = useSelector(getTempItemCart);
  const productType = GuitarsType.get(type)?.type;
  const isOpen = useSelector(getIsCartAddOpen);
  const dispatch = useDispatch();

  const handleKeydown = (evt: KeyboardEvent) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      dispatch(resetTempItemCart());
      dispatch(toggleIsCartAddOpen(false));
      dispatch(closeAllModals());
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleOnCloseClick = () => {
    dispatch(resetTempItemCart());
    dispatch(toggleIsCartAddOpen(false));
  };

  const handleClick = () => {
    dispatch(addToCart(id));
    dispatch(resetTempItemCart());
    dispatch(toggleIsCartAddOpen(false));
    dispatch(toggleIsCartSuccessOpen(true));
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
              onClick={() => {
                dispatch(resetTempItemCart());
                dispatch(toggleIsCartAddOpen(false));
                dispatch(closeAllModals());
              }}
            >
            </div>
            <div className='modal__content'>
              <h2 className='modal__header title title--medium'>
                Добавить товар в корзину
              </h2>
              <div className='modal__info'>
                <img className='modal__img' src={`/${previewImg}`} width='67' height='137' alt={name} />
                <div className='modal__info-wrapper'>
                  <h3 className='modal__product-name title title--little title--uppercase'>
                    Гитара {name}
                  </h3>
                  <p className='modal__product-params modal__product-params--margin-11'>
                    Артикул: {vendorCode}
                  </p>
                  <p className='modal__product-params'>
                    {productType}, {stringCount} струнная
                  </p>
                  <p className='modal__price-wrapper'>
                    <span className='modal__price'>Цена:</span>
                    <span className='modal__price'>{prettify(price)} ₽</span>
                  </p>
                </div>
              </div>
              <div className='modal__button-container'>
                <button onClick={handleClick} className='button button--red button--big modal__button modal__button--add' >
                  Добавить в корзину
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
