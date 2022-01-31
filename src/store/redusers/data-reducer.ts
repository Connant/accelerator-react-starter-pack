import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slice } from '../../const';
import { CompleteGuitar, GuitarType, GuitarsList } from '../../types/types';
import { Comment } from '../../types/types';
import { AppData } from '../../types/app';

const initialState: AppData = {
  guitarsSearch: [],
  guitarsShow: [],
  priceEnd: 0,
  priceStart: 0,
  productsCount: null,
  isLoading: true,
  currentGuitars: {} as GuitarType,
  currentComments: [],
};

const appDataSlice = createSlice({
  name: Slice.AppData,
  initialState,
  reducers: {
    addGuitarssSearch: (state, action: PayloadAction<GuitarsList>) => {
      state.guitarsSearch = action.payload;
    },
    clearGuitarssSearch: (state) => {
      state.guitarsSearch = initialState.guitarsSearch;
    },
    addGuitarssShow: (state, action: PayloadAction<CompleteGuitar[]>) => {
      state.guitarsShow = action.payload;
    },
    addPriceStart: (state, action: PayloadAction<number>) => {
      state.priceStart = action.payload;
    },
    addPriceEnd: (state, action: PayloadAction<number>) => {
      state.priceEnd = action.payload;
    },
    addGuitarssCount: (state, action: PayloadAction<number>) => {
      state.productsCount = action.payload;
    },
    clearGuitarssCount: (state) => {
      state.productsCount = initialState.productsCount;
    },
    toggleIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addCurrentGuitars: (state, action: PayloadAction<GuitarType>) => {
      state.currentGuitars = action.payload;
    },
    clearCurrentGuitars: (state) => {
      state.currentGuitars = initialState.currentGuitars;
    },
    addCurrentComments: (state, action: PayloadAction<Comment[]>) => {
      state.currentComments = action.payload;
    },
    clearCurrentComments: (state) => {
      state.currentComments = initialState.currentComments;
    },
  },
});

export const {
  addGuitarssSearch,
  clearGuitarssSearch,
  addGuitarssShow,
  addPriceEnd,
  addPriceStart,
  addGuitarssCount,
  toggleIsLoading,
  clearGuitarssCount,
  addCurrentGuitars,
  clearCurrentGuitars,
  addCurrentComments,
  clearCurrentComments,
} = appDataSlice.actions;

export default appDataSlice.reducer;
