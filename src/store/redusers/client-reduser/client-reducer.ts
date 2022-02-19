import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slice, SortState, FilterState } from '../../../const';

export type AppClient = {
  sort: SortState,
  filter: FilterState,
  searchCriteria: string,
};

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

const appClientSlice = createSlice({
  name: Slice.AppClient,
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
    },
    resetSort: (state) => {
      state.sort = initialState.sort;
    },
    setFilter: (state, action: PayloadAction<FilterState>) => {
      state.filter = action.payload;
    },
    searchCriteria: (state, action: PayloadAction<string>) => {
      state.searchCriteria = action.payload;
    },
    researchCriteria: (state) => {
      state.searchCriteria = initialState.searchCriteria;
    },
  },
});

export const { setSort, setFilter, resetSort, searchCriteria, researchCriteria } = appClientSlice.actions;

export default appClientSlice.reducer;
