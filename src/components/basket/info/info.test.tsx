import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockCLIENT } from '../../../mocks/mocks';
import { requestOrder } from '../../../store/actions-api';
import Info from './info';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../../const';


jest.mock('../../../store/actions-api');

const fakePostOrder = requestOrder as jest.MockedFunction<typeof requestOrder>;
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const BONUS_CLASSNAME = 'cart__total-value--bonus';

const mockStore = configureMockStore();

const FakeInCart = {
  '1': 2,
  '3': 1,
};
const FAKE_DISCOUNT = 25;
const FAKE_TOTAL_PRICE = 100;
const FakeTotalPrice = {
  '1': 50,
  '3': 50,
};
const FakeCoupon = {
  value: 'medium-444',
  sale: 25,
};
const componentState = {
  CLIENT: { ...MockCLIENT, inCart: FakeInCart, totalPrice: FakeTotalPrice },
};
const componentStateWithCoupon = {
  CLIENT: { ...MockCLIENT, inCart: FakeInCart, totalPrice: FakeTotalPrice, coupon: FakeCoupon },
};

describe('Component: Info', () => {
  it('should render correctly without sale', () => {
    const store = mockStore(componentState);
    // customRenderWithProvider(<Info />, store);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<Info />} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    expect(screen.getAllByText(`${FAKE_TOTAL_PRICE} ₽`).length).toEqual(2);
    expect(screen.getByText('0 ₽')).toBeInTheDocument();
    expect(screen.getByTestId('sale')).toBeInTheDocument();
    expect(screen.getByTestId('sale')).not.toHaveClass(BONUS_CLASSNAME);
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });
  it('should render correctly with coupon', () => {
    const store = mockStore(componentStateWithCoupon);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<Info />} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    expect(screen.getAllByText(`${FAKE_TOTAL_PRICE} ₽`).length).toEqual(1);
    expect(screen.getByText(`${FAKE_DISCOUNT} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`${FAKE_TOTAL_PRICE-FAKE_DISCOUNT} ₽`)).toBeInTheDocument();
    expect(screen.getByTestId('sale')).toBeInTheDocument();
    expect(screen.getByTestId('sale')).toHaveClass(BONUS_CLASSNAME);
  });
  it('should dispatch correctly if click on OrderBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateWithCoupon);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<Info />} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    userEvent.click(screen.getByText(/Оформить заказ/i));
    expect(dispatch).toBeCalledTimes(1);
    expect(fakePostOrder).toBeCalledTimes(1);
  });
});
