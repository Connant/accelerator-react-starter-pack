import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { generatePath, Routes, Route, HistoryRouter } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { MockDATA, MockCLIENT, fakeProduct } from '../../../mocks/mocks';
import { ROOT } from '../../../test-utils';
import BreadCrumbs from './bread-crumbs';


const history = createMemoryHistory();

const ID = 1;
const productPath = generatePath(AppRoute.CardPage, { id: ID.toString() });
const fakeCurrentGuitar = { ...fakeProduct, name: 'Guitar', id: ID };
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
        <BreadCrumbs guitar={fakeProduct}/>
      </HistoryRouter>
    </Provider>);

describe('Component: BreadCrumbs', () => {
  it('should render correctly', () => {
    act(() => {
      history.push(AppRoute.Main);
    });
    renderBreadcrumbs();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    act(() => {
      history.push(`/${productPath}`);
    });
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    act(() => {
      history.push(`/${AppRoute.Cart}`);
    });
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.queryByText('Guitar')).not.toBeInTheDocument();
    act(() => {
      history.push(AppRoute.Main);
    });
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.queryByText('Guitar')).not.toBeInTheDocument();
    expect(screen.queryByText(/Корзина/i)).not.toBeInTheDocument();
  });

  it('should redirect to /root when user clicked on link', () => {
    act(() => {
      history.push(`/${AppRoute.Main}`);
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<BreadCrumbs guitar={fakeProduct}/>} />
            <Route path={AppRoute.ListPage} element={<h1>{ROOT}</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>);
    expect(screen.queryByText(/root/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Главная/i));
    act(() => {history.push(`/${AppRoute.Main}`);});
    expect(screen.queryByText(/root/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Каталог/i));
  });
});
