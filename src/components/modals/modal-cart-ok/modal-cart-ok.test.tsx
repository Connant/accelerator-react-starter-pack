import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { MockDATA, MockCLIENT } from '../../../mocks/mocks';
import { toggleIsCartSuccessOpen } from '../../../store/redusers/data-reducer/data-reducer';
import ModalCartOk from './modal-cart-ok';
import { AppRoute } from '../../../const';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from 'react-router-dom';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const history = createMemoryHistory();

const mockStore = configureMockStore();
const componentState = {
  DATA: { ...MockDATA, isCartSuccessOpen: true },
  CLIENT: MockCLIENT,
};

const renderModalCartSuccess = (store: MockStore) =>
  render(
    <Redux.Provider store={store}>
      <HistoryRouter history={history}>
        <ModalCartOk />
      </HistoryRouter>
    </Redux.Provider>);

describe('Component: ModalCartOk', () => {
  afterAll(cleanup);
  it('should not render', () => {
    const store = mockStore({...componentState, DATA: {isCartSuccessOpen: false}});
    renderModalCartSuccess(store);
    expect(screen.queryByText(/Товар успешно добавлен в корзину/i)).not.toBeInTheDocument();
  });
  it('should render correctly', () => {
    const store = mockStore(componentState);
    renderModalCartSuccess(store);
    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });
  it('should dispatch correctly and redirect to cart', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderModalCartSuccess(store);
    userEvent.click(screen.getByText(/Перейти в корзину/i));
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartSuccessOpen(false));
    expect(history.location.pathname).toBe(AppRoute.Cart);
  });
  it('should dispatch correctly and redirect to main', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderModalCartSuccess(store);
    userEvent.click(screen.getByText(/Продолжить покупки/i));
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartSuccessOpen(false));
    expect(history.location.pathname).toBe(AppRoute.Main);
  });
  it('should dispatch correctly CloseBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderModalCartSuccess(store);
    userEvent.click(screen.getByTestId('modalCloseBtn'));
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartSuccessOpen(false));
  });
});
