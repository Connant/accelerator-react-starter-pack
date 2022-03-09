import { useState, useEffect, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CouponError } from '../../../const';
import { requestCoupon } from '../../../store/actions-api';
import { clearCoupon } from '../../../store/redusers/client-reduser/client-reducer';
import { getCoupon } from '../../../store/selectors';


export default function Coupon (): JSX.Element {
  const couponValue = useSelector(getCoupon).value;
  const dispatch = useDispatch();

  const initialValue = couponValue === null || couponValue === CouponError.value ? '' : couponValue;

  const [coupon, setCoupon] = useState(initialValue);

  useEffect(() => {
    if (coupon === '') {
      dispatch(clearCoupon());
    }
  }, []);

  return (
    <div className='cart__coupon coupon'>
      <h2 className='title title--little coupon__title'>Промокод на скидку</h2>
      <p className='coupon__info'>Введите свой промокод, если он у вас есть.</p>
      <form
        onSubmit={(evt: FormEvent<HTMLFormElement>) => {
          evt.preventDefault();
          const currentCoupon = coupon.trim().toLocaleLowerCase();
          dispatch(requestCoupon(currentCoupon));
        }}
        className='coupon__form' id='coupon-form'
      >
        <div className='form-input coupon__input'>
          <label className='visually-hidden'>Промокод</label>
          <input
            onChange={(evt) => setCoupon(evt.target.value)}
            type='text'
            placeholder='Введите промокод'
            id='coupon'
            name='coupon'
            value={coupon}
            data-testid='coupon'
          />
          {couponValue !== null && couponValue !== CouponError.value && (
            <p className='form-input__message form-input__message--success'>
              Промокод принят
            </p>
          )}
          {couponValue === CouponError.value && (
            <p className='form-input__message form-input__message--error'>
              неверный промокод
            </p>
          )}
        </div>
        <button className='button button--big coupon__button'>Применить</button>
      </form>
    </div>
  );
}
