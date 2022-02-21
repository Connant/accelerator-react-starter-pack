import { createMemoryHistory } from 'history';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'react-router-dom';
import { store } from '../..';
import App from './app';

const history = createMemoryHistory();

describe('App Routing', () => {
  it('render 404 page when page Not Found', () => {
    history.push('/error');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>);
    expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();
  });
});

