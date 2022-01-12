import { createReducer } from '@reduxjs/toolkit';
import { setSortingMethod, setSortOrder } from './action';
import { OrderOption, SortingMethod } from '../const';

export type DataType = {
  SortingMethod: SortingMethod,
  sortOrder: OrderOption  | '',
};

const initialState: DataType = {
  SortingMethod: SortingMethod.Price,
  sortOrder: '',
};

const appReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(setSortingMethod, (state, action) => {
      const { sortingMethod } = action.payload;
      state.SortingMethod = sortingMethod;
    })

    .addCase(setSortOrder, (state, action) => {
      const { sortOrder } = action.payload;
      state.sortOrder = sortOrder;
    });

});

export { appReducer };
