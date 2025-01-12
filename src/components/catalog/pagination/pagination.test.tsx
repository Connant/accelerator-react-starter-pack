import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, cleanup, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import * as Redux from 'react-redux';
import { HistoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { MockDATA, MockCLIENT } from '../../../mocks/mocks';
import Pagination from './pagination';


const COUNT = 35;
const mockStore = configureMockStore();
const history = createMemoryHistory();

const componentState = {
  DATA: { ...MockDATA, guitarCount: COUNT },
  CLIENT: MockCLIENT,
};
const store = mockStore(componentState);

const renderPagination = (page: number) =>
  render(
    <Redux.Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Main} />
          <Route path={AppRoute.ListPage} element={<Pagination page={page} />} />
        </Routes>
      </HistoryRouter>
    </Redux.Provider>);

describe('Component: Pagination', () => {
  afterEach(cleanup);
  it('should render correctly', () => {
    act(() => {
      history.replace('/catalog/page_2');
    });
    renderPagination(2);
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
    expect(screen.getByTestId('Назад')).toBeVisible();
    expect(screen.getByTestId('Далее')).toBeVisible();
  });
});
