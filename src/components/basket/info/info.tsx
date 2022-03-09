import { useDispatch, useSelector } from 'react-redux';
import { requestOrder } from '../../../store/actions-api';
import { getTotalPrices, getTotalSale, getCoupon, getOrdersIDs } from '../../../store/selectors';

export default function Info (): JSX.Element {
  const totalPrices = useSelector(getTotalPrices);
  const totalSale = useSelector(getTotalSale);
  const couponValue = useSelector(getCoupon).value;
  const guitarsID = useSelector(getOrdersIDs);
  const dispatch = useDispatch();

  return (
    <div className='cart__total-info'>
      <p className='cart__total-item'>
        <span className='cart__total-value-name'>Всего:</span>
        <span className='cart__total-value'>{totalPrices} ₽</span>
      </p>
      <p className='cart__total-item'>
        <span className='cart__total-value-name'>Скидка:</span>
        <span data-testid='sale' className={`cart__total-value ${!!totalSale && 'cart__total-value--bonus'}`}>
          {totalSale} ₽
        </span>
      </p>
      <p className='cart__total-item'>
        <span className='cart__total-value-name'>К оплате:</span>
        <span className='cart__total-value cart__total-value--payment'>
          {totalPrices - totalSale} ₽
        </span>
      </p>
      <button onClick={()=>dispatch(requestOrder({ guitarsID, couponValue }))} className='button button--red button--big cart__order-button'>
        Оформить заказ
      </button>
    </div>
  );
}
