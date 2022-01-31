import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slice, SortState, FilterState } from '../../const';

export type AppClient = {
  sort: SortState,
  filter: FilterState,
  searchKey: string,
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
  searchKey: '',
};

const appClientSlice = createSlice({
  name: Slice.AppClient,
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterState>) => {
      state.filter = action.payload;
    },
    removeFilter: (state) => {
      state.filter = initialState.filter;
    },
    removeSort: (state) => {
      state.sort = initialState.sort;
    },
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },
    resetSearchKey: (state) => {
      state.searchKey = initialState.searchKey;
    },
  },
});

export const { setSort, setFilter, setSearchKey, removeSort, removeFilter, resetSearchKey } = appClientSlice.actions;

export default appClientSlice.reducer;
