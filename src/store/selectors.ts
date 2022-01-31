/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from 'reselect';
import { Reducer } from '../const';
import { State } from '../types/state';
import { getSortedGuitars } from '../utils';

export const getGuitarsSearch = (state: State) => state[Reducer.Data].guitarsSearch;
export const getGuitarsShow = (state: State) => state[Reducer.Data].guitarsShow;
export const getMaxPrice = (state: State) => state[Reducer.Data].priceEnd;
export const getMinPrice = (state: State) => state[Reducer.Data].priceStart;
export const getGuitarssCount = (state: State) => state[Reducer.Data].productsCount;
export const getIsLoading = (state: State) => state[Reducer.Data].isLoading;
export const getCurrentGuitar = (state: State) => state[Reducer.Data].currentGuitars;
export const getCurrentComments = (state: State) => state[Reducer.Data].currentComments;
export const getSort = (state: State) => state[Reducer.Client].sort;
export const getGuitarFilter = (state: State) => state[Reducer.Client].filter;
export const getSearchKey = (state: State) => state[Reducer.Client].searchKey;

