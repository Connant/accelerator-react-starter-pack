import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { CreateFakeGuitar, MockDATA, MockCLIENT } from '../../../mocks/mocks';
import { addToCart } from '../../../store/redusers/client-reduser/client-reducer';
import { resetTempItemCart, toggleIsCartAddOpen, toggleIsCartSuccessOpen } from '../../../store/redusers/data-reducer/data-reducer';
import ModalCartAdd from './modal-cart-add';
import { customRenderProvider } from '../../../test-utils';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const NAME = 'name';
const fakeProduct = { ...CreateFakeGuitar(), id: 1, name: NAME };
const mockStore = configureMockStore();
const componentState = {
  DATA: { ...MockDATA, tempItemCart: fakeProduct, isCartAddOpen: true  },
  CLIENT: MockCLIENT,
};

describe('Component: ModalCartAdd', () => {
  afterAll(cleanup);
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderProvider(<ModalCartAdd />, store);
    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeProduct.name}`)).toBeInTheDocument();
    expect(screen.getByTestId('modalCloseBtn')).toBeInTheDocument();
  });
  it('should dispatch correctly if cart add in card', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderProvider(<ModalCartAdd />, store);
    userEvent.click(screen.getByText(/Добавить в корзину/i));
    expect(dispatch).toBeCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(addToCart(fakeProduct.id));
    expect(dispatch).toHaveBeenCalledWith(resetTempItemCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartAddOpen(false));
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartSuccessOpen(true));
  });
  it('should dispatch correctly if close', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderProvider(<ModalCartAdd />, store);
    userEvent.click(screen.getByTestId('modalCloseBtn'));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(resetTempItemCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartAddOpen(false));
  });
});

