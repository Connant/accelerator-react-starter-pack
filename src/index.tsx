import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import browserHistory from './browser-history/browser-history';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { store } from './store/store';
import ReviewForm from './components/product/review/modals/review-form/review-form';
import ModalOk from './components/product/review/modals/modal-ok/mpdal-ok';
import ModalCartAdd from './components/modals/modal-cart-add/modal-cart-add';
import ModalCartDelete from './components/modals/modal-cart-delete/modal-cart-delete';
import ModalCartOk from './components/modals/modal-cart-ok/modal-cart-ok';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
        <ReviewForm />
        <ModalOk />
        <ModalCartAdd />
        <ModalCartDelete />
        <ModalCartOk />
        <ToastContainer limit={1} />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
