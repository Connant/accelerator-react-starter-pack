/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Redux from 'react-redux';
import { cleanup, render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MockDATA, fakeProducts, MockCLIENT, fakeGuitars } from '../../mocks/mocks';
import Catalog from './catalog';
import { HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';


jest.mock('../../store/redusers/client-reduser/client-reducer');
jest.mock('../../store/actions-api');
mockAllIsIntersecting(true);

const GUITARS = 36;

const mockStore = configureMockStore();
const componentState = {
  DATA: {
    ...MockDATA,
    guitarsShow: fakeProducts,
    guitarsCount: GUITARS,
    isLoading: false,
  },
  CLIENT: MockCLIENT,
};

const filterCurrent = {
  guitarTypes: ['electric', 'ukulele'],
  stringCounts: ['4', '6'],
  minPrice: '',
  maxPrice: '',
};

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const history = createMemoryHistory();

const renderCatalogPage = (store: MockStore) =>
  render(
    <Redux.Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Main} element={<Navigate to={AppRoute.Main} />} />
          <Route path={AppRoute.ListPage} element={<Catalog guitars={fakeProducts} filter={filterCurrent} page={1} />} />
        </Routes>
      </HistoryRouter>
    </Redux.Provider>);

describe('Component: Catalog', () => {
  afterEach(cleanup);
  it('should render correctly', () => {
    // useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderCatalogPage(store);
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/по цене/i)).toBeInTheDocument();
    expect(screen.queryAllByTestId('pagination').length).toEqual(3);
    expect(screen.queryAllByText(/Подробнее/i).length).toEqual(fakeGuitars.length);
  });
});
