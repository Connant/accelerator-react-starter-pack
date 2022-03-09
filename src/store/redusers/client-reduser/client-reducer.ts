import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slice, SortState, FilterState, CouponInit } from '../../../const';
import { TotalPrice, Coupon } from '../../../types/types';

export type AppClient = {
  sort: SortState,
  filter: FilterState,
  searchCriteria: string,
  inCart: {
    [key: string]: number
  },
  totalPrice: TotalPrice,
  coupon: Coupon,
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
  inCart: {},
  totalPrice: {},
  coupon: CouponInit,
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


    addToCart: (state, action: PayloadAction<number>) => {
      state.inCart[action.payload]
        ? (state.inCart[action.payload] = state.inCart[action.payload] + 1)
        : (state.inCart[action.payload] = 1);
    },
    setQuantityCart: (state, action: PayloadAction<{id:number, quantity: number}>) => {
      state.inCart[action.payload.id] = action.payload.quantity;
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      delete state.inCart[action.payload];
      delete state.totalPrice[action.payload];
    },
    clearCart: (state) => {
      state.inCart = initialState.inCart;
      state.totalPrice = initialState.totalPrice;
    },
    setTotalPrice: (state, action: PayloadAction<{id:number, price: number}>) => {
      state.totalPrice[action.payload.id] = action.payload.price;
    },
    addCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupon = action.payload;
    },
    clearCoupon: (state) => {
      state.coupon = initialState.coupon;
    },
  },
});

export const { setSort, setFilter, resetSort, searchCriteria, researchCriteria, addToCart, clearCoupon,
  setQuantityCart, deleteFromCart, clearCart, setTotalPrice, addCoupon } = appClientSlice.actions;

export default appClientSlice.reducer;
