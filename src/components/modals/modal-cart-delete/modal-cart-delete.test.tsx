import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { CreateFakeGuitar, MockDATA, MockCLIENT } from '../../../mocks/mocks';
import { deleteFromCart } from '../../../store/redusers/client-reduser/client-reducer';
import { deleteProductFromCart, resetTempItemCart, toggleIsCartDeleteOpen } from '../../../store/redusers/data-reducer/data-reducer';
import ModalCartDelete from './modal-cart-delete';
import { customRenderProvider } from '../../../test-utils';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const NAME = 'name';
const fakeProduct = { ...CreateFakeGuitar(), id: 1, name: NAME };
const mockStore = configureMockStore();
const componentState = {
  DATA: { ...MockDATA, tempItemCart: fakeProduct, isCartDeleteOpen: true },
  CLIENT: MockCLIENT,
};

describe('Component: ModalCartDelete', () => {
  afterAll(cleanup);
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderProvider(<ModalCartDelete />, store);
    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    expect(screen.getByText(/Удалить товар/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeProduct.name}`)).toBeInTheDocument();
  });
  it('should dispatch correctly if click on remove button', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderProvider(<ModalCartDelete />, store);
    userEvent.click(screen.getByText(/Удалить товар/i));
    expect(dispatch).toBeCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(deleteFromCart(fakeProduct.id));
    expect(dispatch).toHaveBeenCalledWith(deleteProductFromCart(fakeProduct.id));
    expect(dispatch).toHaveBeenCalledWith(resetTempItemCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartDeleteOpen(false));
  });
  it('should dispatch correctly if click  on proceed button', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderProvider(<ModalCartDelete />, store);
    userEvent.click(screen.getByText(/Продолжить покупки/i));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(resetTempItemCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartDeleteOpen(false));
  });
});
