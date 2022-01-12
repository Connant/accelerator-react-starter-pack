
import { BasicData } from '../types/state';
import { createReducer } from '@reduxjs/toolkit';
import { setFillingGuitarsList } from './action';

const initialState: BasicData = {
  guitarsList: [],
  isDataLoaded: false,
};

const mainReducer = createReducer( initialState, (builder) => {
  builder
    .addCase(setFillingGuitarsList, (state, action) => {
      state.guitarsList = action.payload;
      state.isDataLoaded = true;
    });
});


export { mainReducer };
