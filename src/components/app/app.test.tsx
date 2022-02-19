/* eslint-disable indent */
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import { fakeProduct, MockDATA, MockCLIENT } from '../../mocks/mocks';
import App from './app';


mockAllIsIntersecting(true);
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const mockStore = configureMockStore();
const history = createMemoryHistory();

const NAME = 'Guitar';
const ID = 1;
const fakeCurrentProduct = { ...fakeProduct, name: NAME, id: ID };
const componentState = {
    DATA: { ...MockDATA, currentProduct: fakeCurrentProduct, isLoading: false },
    CLIENT: MockCLIENT,
};
const store = mockStore(componentState);


const renderApp = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>);


describe('Application Routing', () => {
  it('should render Main when user navigate to "/"', () => {
    useDispatch.mockReturnValue(dispatch);
    history.push(AppRoute.Main);
    renderApp();
    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
  });

  it('should render CardPage when user navigate to /guitar/:id', () => {
    window.scrollTo = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    history.push('/guitar/1');
    renderApp();
    expect(screen.getAllByText(NAME).length).toEqual(3);
  });

  it('should render Error', () => {
    useDispatch.mockReturnValue(dispatch);
    history.push('/path');
    renderApp();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
