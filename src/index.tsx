import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { createAPI } from './service/api';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RootReducer, redirect } from './store/root-reducer';
import { ToastContainer } from 'react-toastify';

const api = createAPI();

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }).concat(redirect),
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer limit={1} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
