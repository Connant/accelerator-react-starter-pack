import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartProducts } from '../../store/actions-api';
import { getProductsIDs, getProductsInCart } from '../../store/selectors';
import Footer from '../footer/footer';
import Header from '../header/header';
import BreadCrumbs from '../basket/bread-crumbs/bread-crumbs';
import CartItem from '../basket/cart-item/cart-item';
import Coupon from '../basket/coupon/coupon';
import Info from '../basket/info/info';

export default function CartPage(): JSX.Element {

  const productsInCart = useSelector(getProductsInCart);
  const dispatch = useDispatch();
  const productsIDs = useSelector(getProductsIDs);

  useEffect(() => {
    dispatch(fetchCartProducts(productsIDs));
  }, []);


  return (
    <React.Fragment>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <BreadCrumbs />
          <div className="cart">

            {productsInCart.map((guitar) => (
              <CartItem key={guitar.id} guitar={guitar} />
            ))}

            <div className="cart__footer">
              <Coupon />
              <Info />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
