import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../../../const';
import { MockCLIENT, fakeProduct } from '../../../../mocks/mocks';
import { CompleteGuitar } from '../../../../types/types';
import Card from './card';


const mockStore = configureMockStore();

const componentState = {
  CLIENT: MockCLIENT,
};
const store = mockStore(componentState);
const RATING = 3;
const NAME = 'name';
const ID = 5;
const PRICE = 100;

const guitar: CompleteGuitar = {
  ...fakeProduct,
  rating: RATING,
  name: NAME,
  price: PRICE,
  id: ID,
};

describe('Component: Card', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<Card guitar={guitar} />} />
          </Routes>
        </BrowserRouter>
      </Provider>);
    expect(screen.getByText(NAME)).toBeInTheDocument();
    expect(screen.getByText(guitar.rating)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Подробнее/i));
  });
});
