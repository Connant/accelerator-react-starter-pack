import { MockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const';

export const ROOT = 'root';
export const Main = 'Main';

export const customRender = (element: JSX.Element) =>
  render(
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={element} />
      </Routes>
    </BrowserRouter>);

export const customRenderProvider = (
  element: JSX.Element,
  store: MockStore) =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={element} />
        </Routes>
      </BrowserRouter>
    </Provider>);

