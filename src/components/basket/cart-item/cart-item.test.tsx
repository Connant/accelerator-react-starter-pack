import { render, screen, waitFor } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../../const';
import { GuitarType } from '../../../types/types';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateFakeGuitar, MockCLIENT } from '../../../mocks/mocks';
import { addTempItemCart, toggleIsCartDeleteOpen } from '../../../store/redusers/data-reducer/data-reducer';
import CartItem from './cart-item';
import { setQuantityCart, setTotalPrice } from '../../../store/redusers/client-reduser/client-reducer';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const mockStore = configureMockStore();

const FAKE_ID = 1;
const PRICE = 25;
const FAKE_COUNT = 2;
const FAKE_TOTAL_PRICE = 50;
const FAKE_NEW_COUNT = 25;
const fakeProduct = { ...CreateFakeGuitar(), id: FAKE_ID, price: PRICE } as GuitarType;

const FakeInCart = {
  '1': 2,
  '3': 1,
};
const FakeTotalPrice = {
  '1': 50,
  '3': 50,
};
const FakeInCartMax = {
  '1': 99,
  '3': 1,
};

const componentState = {
  CLIENT: { ...MockCLIENT, inCart: FakeInCart, totalPrice: FakeTotalPrice },
};

const componentStateMax = {
  CLIENT: { ...MockCLIENT, inCart: FakeInCartMax, totalPrice: FakeTotalPrice },
};

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<CartItem guitar={fakeProduct}/>} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    expect(screen.getByText(`${FAKE_TOTAL_PRICE} ₽`)).toBeInTheDocument();
    expect(screen.getByTestId('quantity')).toBeInTheDocument();
    expect(screen.getByTestId('quantity')).toHaveValue(FAKE_COUNT.toString());
    expect(screen.getByLabelText(/Увеличить количество/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Уменьшить количество/i)).toBeInTheDocument();
  });
  it('should dispatch correctly if click CartDeleteBtn', async () => {
    useDispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<CartItem guitar={fakeProduct}/>} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    userEvent.click(screen.getByLabelText(/Удалить/i));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toBeCalledWith(addTempItemCart(fakeProduct));
    expect(dispatch).toBeCalledWith(toggleIsCartDeleteOpen(true));
  });
  it('should not enter in input value<1 & value>99', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<CartItem guitar={fakeProduct}/>} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    userEvent.type(screen.getByTestId('quantity'), '5');
    expect(screen.getByTestId('quantity')).toHaveValue(FAKE_COUNT.toString()+5);
    userEvent.type(screen.getByTestId('quantity'), '9');
    expect(screen.getByTestId('quantity')).toHaveValue(FAKE_COUNT.toString()+5);
    userEvent.clear(screen.getByTestId('quantity'));
    expect(screen.getByTestId('quantity')).toHaveValue('');
    userEvent.type(screen.getByTestId('quantity'), '0');
    expect(screen.getByTestId('quantity')).toHaveValue('');
    userEvent.type(screen.getByTestId('quantity'), 'A');
    expect(screen.getByTestId('quantity')).toHaveValue('');
    userEvent.type(screen.getByTestId('quantity'), '-');
    expect(screen.getByTestId('quantity')).toHaveValue('');
    userEvent.type(screen.getByTestId('quantity'), '100');
    expect(screen.getByTestId('quantity')).toHaveValue('10');
  });
  it('should not set input value<1 & dispatch correctly if click on remove', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<CartItem guitar={fakeProduct}/>} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    expect(screen.getByTestId('quantity')).toHaveValue('2');
    userEvent.click(screen.getByLabelText(/Уменьшить количество/i));
    expect(screen.getByTestId('quantity')).toHaveValue('1');
    expect(dispatch).not.toBeCalled();
    userEvent.click(screen.getByLabelText(/Уменьшить количество/i));
    expect(screen.getByTestId('quantity')).toHaveValue('1');
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toBeCalledWith(addTempItemCart(fakeProduct));
    expect(dispatch).toBeCalledWith(toggleIsCartDeleteOpen(true));
  });
  it('should not set input value>99 if click on add', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateMax);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<CartItem guitar={fakeProduct}/>} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    expect(screen.getByTestId('quantity')).toHaveValue('99');
    userEvent.click(screen.getByLabelText(/Увеличить количество/i));
    expect(screen.getByTestId('quantity')).toHaveValue('99');
  });
  it('should dispatch correctly if input changed', async () => {
    useDispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<CartItem guitar={fakeProduct}/>} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);
    userEvent.type(screen.getByTestId('quantity'), '5');
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(setQuantityCart({id: FAKE_ID, quantity: FAKE_NEW_COUNT})));
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(setTotalPrice({id: FAKE_ID, price: FAKE_NEW_COUNT*PRICE})));
    userEvent.click(screen.getByLabelText(/Увеличить количество/i));
    expect(screen.getByTestId('quantity')).toHaveValue('26');
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(setQuantityCart({id: FAKE_ID, quantity: 26})));
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(setTotalPrice({id: FAKE_ID, price: 26*PRICE})));
  });
});
