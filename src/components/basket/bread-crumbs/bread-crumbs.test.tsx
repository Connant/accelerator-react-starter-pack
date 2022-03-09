

import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { generatePath, HistoryRouter } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { MockDATA, MockCLIENT, fakeProduct } from '../../../mocks/mocks';
import BreadCrumbs from './bread-crumbs';


const history = createMemoryHistory();

const ID = 1;
const path = generatePath(AppRoute.Cart);
const fakeCurrentGuitar = { ...fakeProduct, id: ID };
const componentState = {
  DATA: { ...MockDATA, currentGuitar: fakeCurrentGuitar },
  CLIENT: MockCLIENT,
};

const mockStore = configureMockStore();
const store = mockStore(componentState);

const renderBreadcrumbs = () =>
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <BreadCrumbs/>
      </HistoryRouter>
    </Provider>);

describe('Component: BreadCrumbs', () => {
  it('should render correctly', () => {
    act(() => {history.push(AppRoute.Main);});
    renderBreadcrumbs();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    act(() => {history.push(`/${path}`);});
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    act(() => {history.push(`/${AppRoute.Cart}`);});
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    act(() => {history.push(AppRoute.Main);});
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
});

