import { MockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const';

export const ROOT = 'root';
export const Main = 'Main';

const history = createMemoryHistory();

export const customRender = (element: JSX.Element) =>
  render(
    <HistoryRouter history={history}>
      <Routes>
        <Route path={AppRoute.Main} element={element} />
      </Routes>
    </HistoryRouter>);

export const customRenderProvider = (
  element: JSX.Element,
  store: MockStore) =>
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Main} element={element} />
        </Routes>
      </HistoryRouter>
    </Provider>);

