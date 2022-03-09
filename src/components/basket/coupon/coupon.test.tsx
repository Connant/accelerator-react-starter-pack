import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CouponError, AppRoute } from '../../../const';
import { MockCLIENT } from '../../../mocks/mocks';
import { requestCoupon } from '../../../store/actions-api';
import Coupon from './coupon';

jest.mock('../../../store/actions-api');

const fakePostCoupon = requestCoupon as jest.MockedFunction<typeof requestCoupon>;
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();

const FakeCoupon = {
  value: 'light-333',
  sale: 25,
};

const componentState = {
  CLIENT: MockCLIENT,
};
const componentStateWithCoupon = {
  CLIENT: { ...MockCLIENT, coupon: FakeCoupon },
};
const componentStateWithError = {
  CLIENT: { ...MockCLIENT, coupon: CouponError },
};

const COUPON_WTH_SPACE = 'Light-333';
const COUPON_WTHOUT_SPACE = 'light-333';

describe('Component: Coupon', () => {
  it('should render correctly without validation message', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<Coupon />} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Применить/i)).toBeInTheDocument();
    expect(screen.getByTestId('coupon')).toBeInTheDocument();
    expect(screen.queryByText(/Промокод принят/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/неверный промокод/i)).not.toBeInTheDocument();
  });
  it('should render correctly with CouponRight validation message', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateWithCoupon);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<Coupon />} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Применить/i)).toBeInTheDocument();
    expect(screen.getByText(/Промокод принят/i)).toBeInTheDocument();
    expect(screen.queryByText(/неверный промокод/i)).not.toBeInTheDocument();
  });
  it('should render correctly with CouponWrong validation message', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateWithError);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<Coupon />} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Применить/i)).toBeInTheDocument();
    expect(screen.getByText(/неверный промокод/i)).toBeInTheDocument();
    expect(screen.queryByText(/Промокод принят/i)).not.toBeInTheDocument();
  });
  it('should dispatch correctly if click CouponBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<Coupon />} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    userEvent.type(screen.getByTestId('coupon'), COUPON_WTH_SPACE);
    userEvent.click(screen.getByText(/Применить/i));
    expect(fakePostCoupon).toBeCalledTimes(1);
    expect(fakePostCoupon).toBeCalledWith(COUPON_WTHOUT_SPACE);
  });
  it('should render with coupon and clear dispatch correctly if clear input', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateWithCoupon);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<Coupon />} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    expect(screen.getByTestId('coupon')).toHaveValue(FakeCoupon.value);
    expect(screen.getByText(/Промокод принят/i)).toBeInTheDocument();
    userEvent.clear(screen.getByTestId('coupon'));
  });
});
