import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_COMMENTS_COUNT, Slice } from '../../../const';
import { CompleteGuitar, GuitarType, GuitarsList, Comment } from '../../../types/types';
import { AppData } from '../../../types/app';

const initialState: AppData = {
  guitarsSearch: [],
  guitarsShow: [],
  priceEnd: 0,
  priceStart: 0,
  guitarCount: null,
  isLoading: true,
  currentGuitars: {} as GuitarType,
  currentComments: [],
  commentsCounter: DEFAULT_COMMENTS_COUNT,
  isReviewOpen: false,
  isSuccessOpen: false,
  tempItemCart: {} as GuitarType,
  productsInCart: [],
  isCartAddOpen: false,
  isCartDeleteOpen: false,
  isCartSuccessOpen: false,
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
      state.guitarCount = action.payload;
    },
    clearGuitarssCount: (state) => {
      state.guitarCount = initialState.guitarCount;
    },
    toggleIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addCurrentGuitar: (state, action: PayloadAction<GuitarType>) => {
      state.currentGuitars = action.payload;
    },
    clearCurrentGuitar: (state) => {
      state.currentGuitars = initialState.currentGuitars;
    },


    addCurrentComments: (state, action: PayloadAction<Comment[]>) => {
      state.currentComments = action.payload;
    },
    addNewComment: (state, action: PayloadAction<Comment>) => {
      state.currentComments = [action.payload, ...state.currentComments];
    },
    clearCurrentComments: (state) => {
      state.currentComments = initialState.currentComments;
    },
    incrementCommentsCounter: (state) => {
      if (state.commentsCounter > state.currentComments.length) {
        return;
      }
      state.commentsCounter = state.commentsCounter + DEFAULT_COMMENTS_COUNT;
    },
    resetCommentsCounter: (state) => {
      state.commentsCounter = initialState.commentsCounter;
    },

    toggleIsReviewOpen: (state, action: PayloadAction<boolean>) => {
      state.isReviewOpen = action.payload;
    },
    toggleIsSuccessOpen: (state, action: PayloadAction<boolean>) => {
      state.isSuccessOpen = action.payload;
    },
    closeAllModals: (state) => {
      state.isReviewOpen = initialState.isReviewOpen;
      state.isSuccessOpen = initialState.isSuccessOpen;
    },

    addTempItemCart: (state, action: PayloadAction<GuitarType>) => {
      state.tempItemCart = action.payload;
    },
    resetTempItemCart: (state) => {
      state.tempItemCart = initialState.tempItemCart;
    },
    addProductsInCart: (state, action: PayloadAction<GuitarType[]>) => {
      state.productsInCart = action.payload;
    },
    deleteProductFromCart: (state, action: PayloadAction<number>) => {
      state.productsInCart = state.productsInCart.filter((product) => product.id !== action.payload);
    },
    clearProductsInCart: (state) => {
      state.productsInCart = initialState.productsInCart;
    },


    toggleIsCartAddOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartAddOpen = action.payload;
    },
    toggleIsCartDeleteOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartDeleteOpen = action.payload;
    },
    toggleIsCartSuccessOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartSuccessOpen = action.payload;
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
  addCurrentGuitar,
  clearCurrentGuitar,
  addCurrentComments,
  addNewComment,
  clearCurrentComments,
  incrementCommentsCounter,
  resetCommentsCounter,
  toggleIsReviewOpen,
  toggleIsSuccessOpen,
  closeAllModals,
  addTempItemCart,
  resetTempItemCart,
  addProductsInCart,
  deleteProductFromCart,
  clearProductsInCart,
  toggleIsCartAddOpen,
  toggleIsCartDeleteOpen,
  toggleIsCartSuccessOpen } = appDataSlice.actions;

export default appDataSlice.reducer;
