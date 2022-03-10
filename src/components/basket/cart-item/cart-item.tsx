import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarsType } from '../../../const';
import { setQuantityCart, setTotalPrice } from '../../../store/redusers/client-reduser/client-reducer';
import { addTempItemCart, toggleIsCartDeleteOpen } from '../../../store/redusers/data-reducer/data-reducer';
import { getInCart, getTotalPrice } from '../../../store/selectors';
import { GuitarType } from '../../../types/types';
import { prettify, replaceImagePath } from '../../../utils';

export const DELAY_QUANT = 240;
export const MAX_IN_CART = 99;

type Props = {
  guitar: GuitarType;
};

export default function CartItem ({guitar}: Props): JSX.Element {
  const { id, price } = guitar;

  const productType = GuitarsType.get(guitar.type)?.type;
  const dispatch = useDispatch();

  const productCount = useSelector(getInCart)[id];
  const totalPrice = useSelector(getTotalPrice)[id];
  const [quant, setQuant] = useState(productCount.toString());
  const timeout = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (quant === '') {
      return;
    }
    timeout.current = setTimeout(() => {
      dispatch(setQuantityCart({id, quantity: + quant }));
      dispatch(setTotalPrice({id, price: + quant * price}));
    }, DELAY_QUANT);
  }, [dispatch, id, price, quant]);

  const handleInputOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const count = evt.target.validity.valid ? evt.target.value : quant;
    setQuant(count);
  };

  const handleInputOnBlur = () => {
    if (quant === '') {
      setQuant(productCount.toString());
    }
  };

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"
        onClick={() => {
          dispatch(addTempItemCart(guitar));
          dispatch(toggleIsCartDeleteOpen(true));
        }}
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={replaceImagePath(guitar.previewImg)} width="55" height="130" alt="ЭлектроГитара Честер bass" />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{productType} {guitar.name}</p>
        <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
        <p className="product-info__info">{productType}, {guitar.stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{prettify(guitar.price)} ₽</div>


      <div className="quantity cart-item__quantity">
        <button
          onClick={() => {
            if (+quant === 1) {
              dispatch(addTempItemCart(guitar));
              dispatch(toggleIsCartDeleteOpen(true));
              return;
            }
            setQuant((prevQuant) => (+prevQuant-1).toString());
          }}
          className='quantity__button'
          aria-label='Уменьшить количество'
        >
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-minus'></use>
          </svg>
        </button>
        <input
          onChange={handleInputOnChange}
          onBlur={handleInputOnBlur}
          className='quantity__input'
          type='text'
          id='2-count'
          name='2-count'
          pattern='[1-9]|[1-9][0-9]'
          value={quant}
          data-testid='quantity'
        />
        <button
          onClick={() => {
            if ( + productCount >= MAX_IN_CART) {
              return;
            }
            setQuant((prevQuant) => (+prevQuant+1).toString());
          }}
          className='quantity__button'
          aria-label='Увеличить количество'
        >
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-plus'></use>
          </svg>
        </button>
      </div>

      <div className='cart-item__price-total'>{totalPrice} ₽</div>
    </div>
  );
}

