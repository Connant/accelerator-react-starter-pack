import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { createAPI } from './service/api';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/root-reducer';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import browserHistory from './browser-history/browser-history';
import { fetchGuitarsAction } from './store/actions-api';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware ({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(fetchGuitarsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
