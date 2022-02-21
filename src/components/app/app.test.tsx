import { createMemoryHistory } from 'history';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'react-router-dom';
import App from './app';
import { store } from '../../store/store';

const history = createMemoryHistory();

describe('App Routing', () => {
  it('render 404 page when page not found', () => {
    history.push('/page404');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>);
    expect(screen.getByText('Error 404.')).toBeInTheDocument();
  });
});

