import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SortState, SortingMethod, OrderOption } from '../../../const';
import { MockDATA, MockCLIENT } from '../../../mocks/mocks';
import { customRenderProvider } from '../../../test-utils';
import Sort from './sorting';


const SORT_ACTIVE = 'catalog-sort__type-button--active';
const ORDER_ACTIVE = 'catalog-sort__order-button--active';

jest.mock('../../../store/actions-api');
const mockStore = configureMockStore();

const sort: SortState = {
  sort: SortingMethod.Price,
  order: OrderOption.Asc,
};

const componentState = {
  DATA: MockDATA,
  CLIENT: {...MockCLIENT, sort: sort},
};

describe('Component: Sort', () => {
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderProvider(<Sort page={1}/>, store);
    expect(screen.getByLabelText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/по цене/i)).toHaveClass(SORT_ACTIVE);
    expect(screen.getByLabelText(/по популярности/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/по популярности/i)).not.toHaveClass(SORT_ACTIVE);
    expect(screen.getByLabelText(/По возрастанию/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/По возрастанию/i)).toHaveClass(ORDER_ACTIVE);
    expect(screen.getByLabelText(/По убыванию/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/По убыванию/i)).not.toHaveClass(ORDER_ACTIVE);
  });
});

