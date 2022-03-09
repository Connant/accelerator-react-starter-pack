import { useDispatch, useSelector } from 'react-redux';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';
import { GuitarsType } from '../../../const';
import { deleteFromCart } from '../../../store/redusers/client-reduser/client-reducer';
import { resetTempItemCart, toggleIsCartDeleteOpen, deleteProductFromCart, closeAllModals } from '../../../store/redusers/data-reducer/data-reducer';
import { getTempItemCart, getIsCartDeleteOpen } from '../../../store/selectors';
import { replaceImagePath } from '../../../utils';


export default function ModalCartDelete(): JSX.Element | null {
  const { id, name, vendorCode, type, previewImg, stringCount, price } = useSelector(getTempItemCart);
  const productType = GuitarsType.get(type)?.type;
  const isOpen = useSelector(getIsCartDeleteOpen);
  const dispatch = useDispatch();

  const handleOnCloseClick = () => {
    dispatch(resetTempItemCart());
    dispatch(toggleIsCartDeleteOpen(false));
  };
  const handleOnDeleteClick = () => {
    dispatch(deleteFromCart(id));
    dispatch(deleteProductFromCart(id));
    dispatch(resetTempItemCart());
    dispatch(toggleIsCartDeleteOpen(false));
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
                dispatch(toggleIsCartDeleteOpen(false));
                dispatch(closeAllModals());
              }}
            >
            </div>
            <div className='modal__content'>
              <h2 className='modal__header title title--medium title--red'>
                Удалить этот товар?
              </h2>
              <div className='modal__info'>
                <img className='modal__img' src={replaceImagePath(previewImg)} width='67' height='137' alt={name} />
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
                    <span className='modal__price'>{price} ₽</span>
                  </p>
                </div>
              </div>
              <div className='modal__button-container'>
                <button
                  onClick={handleOnDeleteClick}
                  className='button button--small modal__button'
                >
                  Удалить товар
                </button>
                <button
                  onClick={handleOnCloseClick}
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

