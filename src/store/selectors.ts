import { createSelector } from 'reselect';
import { Reducer } from '../const';
import { State } from '../types/state';
import { getAllIDs, getCommentsSortByDate, getSumValues } from '../utils';

export const getGuitarsSearch = (state: State) => state[Reducer.Data].guitarsSearch;
export const getGuitarsShow = (state: State) => state[Reducer.Data].guitarsShow;
export const getMaxPrice = (state: State) => state[Reducer.Data].priceEnd;
export const getMinPrice = (state: State) => state[Reducer.Data].priceStart;
export const getIsLoading = (state: State) => state[Reducer.Data].isLoading;
export const getCurrentGuitar = (state: State) => state[Reducer.Data].currentGuitars;
export const getSort = (state: State) => state[Reducer.Client].sort;
export const getGuitarFilter = (state: State) => state[Reducer.Client].filter;
export const GetSearchCriteria = (state: State) => state[Reducer.Client].searchCriteria;
export const getGuitarCount = (state: State) => state[Reducer.Data].guitarCount;
export const getComments = (state: State) => state[Reducer.Data].currentComments;

export const getCurrentComments = (state: State) => state[Reducer.Data].currentComments;
export const getSortedComments  = createSelector(getCurrentComments, getCommentsSortByDate);
export const getCommentsCounter = (state: State) => state[Reducer.Data].commentsCounter;

export const getIsReviewOpen = (state: State) => state[Reducer.Data].isReviewOpen;

export const getIsSuccessOpen = (state: State) => state[Reducer.Data].isSuccessOpen;

export const getTempItemCart = (state: State) => state[Reducer.Data].tempItemCart;

export const getProductsInCart = (state: State) => state[Reducer.Data].productsInCart;

export const getInCart = (state: State) => state[Reducer.Client].inCart;

export const getTotalPrice = (state: State) => state[Reducer.Client].totalPrice;
export const getCoupon = (state: State) => state[Reducer.Client].coupon;
export const getSale = (state: State) => state[Reducer.Client].coupon.sale;

export const getTotalInCart = createSelector(getInCart, getSumValues);

export const getProductsIDs = createSelector(getInCart, (inCart) =>  Object.keys(inCart));

export const getTotalPrices = createSelector(getTotalPrice, getSumValues);

export const getTotalSale = createSelector(getTotalPrices, getSale, (sum, percent) => (sum/100)*percent);

export const getOrdersIDs = createSelector(getInCart, getAllIDs);
export const getIsCartAddOpen = (state: State) =>
  state[Reducer.Data].isCartAddOpen;

export const getIsCartDeleteOpen = (state: State) =>
  state[Reducer.Data].isCartDeleteOpen;

export const getIsCartSuccessOpen = (state: State) =>
  state[Reducer.Data].isCartSuccessOpen;

