import { SortingMethod, OrderOption, ToolType } from '../../../const';
import appClient, { AppClient, setSort, setFilter, searchCriteria, researchCriteria} from './client-reducer';

const initialState: AppClient = {
  sort: {
    sort: '',
    order: '',
  },
  filter: {
    guitarTypes: [],
    stringCounts: [],
    minPrice: '',
    maxPrice: '',
  },
  searchCriteria: '',
};

const FAKE_SORT = {
  sort: SortingMethod.Price,
  order: OrderOption.Asc,
};

const FAKE_FILTER = {
  guitarTypes: [ToolType.Acoustic, ToolType.Electric],
  stringCounts: ['4', '12'],
  minPrice: '1',
  maxPrice: '10',
};

const FAKE_KEY = 'key';


describe('Reducer: appClient', () => {
  let state = initialState;
  it('without additional parameters should return initial state', () => {
    expect(appClient(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });
  it('should update sort by setSort', () => {
    expect(appClient(state, setSort(FAKE_SORT)))
      .toEqual({ ...state, sort: FAKE_SORT });
  });
  it('should update filter by setFilter', () => {
    expect(appClient(state, setFilter(FAKE_FILTER)))
      .toEqual({ ...state, filter: FAKE_FILTER });
  });
  it('should clear searchCriteria by researchCriteria', () => {
    state = {...initialState, searchCriteria: FAKE_KEY };
    expect(appClient(state, researchCriteria()))
      .toEqual(initialState);
  });
  it('should update searchCriteria by setSearchKey', () => {
    state = {...initialState, searchCriteria: FAKE_KEY };
    expect(appClient(state, searchCriteria(FAKE_KEY)))
      .toEqual({...initialState, searchCriteria: FAKE_KEY });
  });

});
