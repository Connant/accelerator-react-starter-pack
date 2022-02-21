import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { Provider } from 'react-redux';
import { HistoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ReviewForm from './components/card-page/review/modals/review-form/review-form';
import ModalOk from './components/card-page/review/modals/modal-ok/mpdal-ok';
import browserHistory from './browser-history/browser-history';
import { store } from './store/store';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
        <ReviewForm />
        <ModalOk />
        <ToastContainer limit={1} />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
