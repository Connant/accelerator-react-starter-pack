import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  setFillingGuitarsList = 'main/setFillingGuitarsList',
  setSortingMethod = 'app/setSortingMethod',
  setSortOrder = 'app/setSortOrder',
  setFilter = 'app/setFilter',
  LoadGuitarsRequest = 'data/loadGuitarsRequest',
  LoadGuitarsSuccess = 'data/loadGuitarsSuccess',
  LoadSearchResults = 'search/loadSearchResults',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
