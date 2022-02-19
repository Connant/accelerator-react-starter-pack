import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen} from '@testing-library/react';
import { MockDATA, MockCLIENT } from '../../../mocks/mocks';
import { customRenderProvider } from '../../../test-utils';
import Filter from './filter';

const mockStore = configureMockStore();
const componentState = {
  DATA: MockDATA,
  CLIENT: MockCLIENT,
};
const store = mockStore(componentState);

const filterCurrent = {
  guitarTypes: ['electric', 'ukulele'],
  stringCounts: ['4', '6'],
  minPrice: '',
  maxPrice: '',
};

describe('Component: Filter', () => {
  it('should render correctly', () => {
    customRenderProvider(<Filter page={1} filter={filterCurrent}/>, store);
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
  });
});
