import { createSelector } from 'reselect';
import { Reducer } from '../const';
import { State } from '../types/state';
import { getCommentsSortByDate } from '../utils';

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

