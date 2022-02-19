import { configureMockStore } from '@jedmao/redux-mock-store';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { MockDATA, MockCLIENT } from '../../../../mocks/mocks';
import { customRenderProvider } from '../../../../test-utils';
import PriceRange from './price-range';


const CLIENT_PRICE = '150';
const PRICE_MIN = '100';
const PRICE_MAX = '200';

jest.mock('../../../../store/actions-api');
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();

const filterCurrent = {
  guitarTypes: ['electric', 'ukulele'],
  stringCounts: ['4', '6'],
  minPrice: '',
  maxPrice: '',
};

const componentState = {
  DATA: MockDATA,
  CLIENT: MockCLIENT,
};

describe('Component: PriceRange', () => {
  afterEach(cleanup);
  it('should render correctly with value null in inputs & placeholders value 0', () => {
    const store = mockStore(componentState);
    customRenderProvider(<PriceRange page={1} filter={filterCurrent}/>, store);
    expect(screen.getByTestId('priceMin')).toHaveValue(null);
    expect(screen.getByTestId('priceMax')).toHaveValue(null);
  });
  it('should render correctly with placeholders value PRICE_MIN, PRICE_MAX', () => {
    const store = mockStore({...componentState, DATA: {...MockDATA, priceStart: PRICE_MIN, priceEnd: PRICE_MAX}});
    customRenderProvider(<PriceRange page={1} filter={filterCurrent}/>, store);
  });
  it('should dispatch correctly & dispatch value < 0', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({...componentState, DATA: {...MockDATA, priceStart: PRICE_MIN, priceEnd: PRICE_MAX}});
    customRenderProvider(<PriceRange page={1} filter={filterCurrent}/>, store);
    expect(screen.getByTestId('priceMin')).toHaveValue(null);
    expect(screen.getByTestId('priceMax')).toHaveValue(null);
    userEvent.type(screen.getByTestId('priceMin'), '-1');
    fireEvent.focusOut(screen.getByTestId('priceMin'));
    userEvent.type(screen.getByTestId('priceMax'), '-1');
    fireEvent.focusOut(screen.getByTestId('priceMax'));
  });

  it('should dispatch correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({...componentState, DATA: {...MockDATA, priceStart: PRICE_MIN, priceEnd: PRICE_MAX}});
    customRenderProvider(<PriceRange page={1} filter={filterCurrent}/>, store);
    expect(screen.getByTestId('priceMin')).toHaveValue(null);
    expect(screen.getByTestId('priceMax')).toHaveValue(null);
    userEvent.type(screen.getByTestId('priceMax'), CLIENT_PRICE);
    fireEvent.focusOut(screen.getByTestId('priceMax'));
  });
});
