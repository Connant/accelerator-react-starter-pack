import { configureMockStore } from '@jedmao/redux-mock-store';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { MockDATA, MockCLIENT } from '../../../../mocks/mocks';
import { customRenderProvider } from '../../../../test-utils';
import ToolType from './tool-type';


jest.mock('../../../../store/actions-api');
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


describe('Component: TypeFilter', () => {
  afterEach(cleanup);
  it('should render correctly with all unchecked', () => {
    const store = mockStore(componentState);
    customRenderProvider(<ToolType page={1} filter={filterCurrent} />, store);
    expect(screen.getByTestId('acoustic')).not.toHaveAttribute('checked');
    expect(screen.getByTestId('ukulele')).toHaveAttribute('checked');
    expect(screen.getByTestId('electric')).toHaveAttribute('checked');
    expect(screen.getByText(/Акустические гитары/i)).toBeInTheDocument();
    expect(screen.getByText(/Электрогитары/i)).toBeInTheDocument();
    expect(screen.getByText(/Укулеле/i)).toBeInTheDocument();
  });

  it('should render correctly with electric & ukulele checked', () => {
    const store = mockStore(currentState);
    customRenderProvider(<ToolType page={1} filter={filterCurrent}/>, store);
    expect(screen.getByTestId('acoustic')).not.toHaveAttribute('checked');
    expect(screen.getByTestId('ukulele')).toHaveAttribute('checked');
    expect(screen.getByTestId('electric')).toHaveAttribute('checked');
  });

  it('should dispatch correctly with stringCounts: [4] when only ukulele checked', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(currentState);
    customRenderProvider(<ToolType page={1} filter={filterCurrent} />, store);
    expect(screen.getByTestId('electric')).toHaveAttribute('checked');
    userEvent.click(screen.getByTestId('electric'));
  });
});
