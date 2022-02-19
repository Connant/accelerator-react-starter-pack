/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Redux from 'react-redux';
import { cleanup, screen } from '@testing-library/react';
import { fetchFilteredGuitars } from '../../../../store/actions-api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { MockDATA, MockCLIENT } from '../../../../mocks/mocks';
import { customRenderProvider } from '../../../../test-utils';
import NumberOfStrings from './number-of-strings';


jest.mock('../../../../store/actions-api');

const fakeFetchFilteredGuitars = fetchFilteredGuitars as jest.MockedFunction<typeof fetchFilteredGuitars>;
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();

const componentState = {
  DATA: MockDATA,
  CLIENT: MockCLIENT,
};

const filterCurrent = {
  guitarTypes: ['electric', 'ukulele'],
  stringCounts: ['4', '6'],
  minPrice: '',
  maxPrice: '',
};

const currentState = {
  DATA: MockDATA,
  CLIENT: {...MockCLIENT, filter: filterCurrent},
};


describe('Component: NumberOfStrings', () => {
  afterEach(cleanup);
  it('should render correctly with all unchecked', () => {
    const store = mockStore(componentState);
    customRenderProvider(<NumberOfStrings page={1} filter={filterCurrent}/>, store);
    expect(screen.getByTestId('4-strings')).toHaveAttribute('checked');
    expect(screen.getByTestId('6-strings')).toHaveAttribute('checked');
    expect(screen.getByTestId('7-strings')).not.toHaveAttribute('checked');
    expect(screen.getByTestId('12-strings')).not.toHaveAttribute('checked');
    expect(screen.getByText(/4/i)).toBeInTheDocument();
    expect(screen.getByText(/6/i)).toBeInTheDocument();
    expect(screen.getByText(/7/i)).toBeInTheDocument();
    expect(screen.getByText(/12/i)).toBeInTheDocument();
  });

  it('should render correctly with 4 & 6 checked and 12 disabled', () => {
    const store = mockStore(currentState);
    customRenderProvider(<NumberOfStrings page={1} filter={filterCurrent}/>, store);
    expect(screen.getByTestId('4-strings')).toHaveAttribute('checked');
    expect(screen.getByTestId('6-strings')).toHaveAttribute('checked');
    expect(screen.getByTestId('12-strings')).toHaveAttribute('disabled');
  });

  it('should dispatch correctly with stringCounts: [4]', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(currentState);
    customRenderProvider(<NumberOfStrings page={1} filter={filterCurrent}/>, store);
    expect(screen.getByTestId('6-strings')).toHaveAttribute('checked');
    userEvent.click(screen.getByTestId('6-strings'));
    expect(fakeFetchFilteredGuitars).toBeCalledWith({...filterCurrent, stringCounts: ['4']}, 1);
  });
});
