import { Action, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from './state';
import { AxiosInstance } from 'axios';

export enum ActionType {
  setFillingGuitarsList = 'main/setFillingGuitarsList',
  setSortingMethod = 'app/setSortingMethod',
  setSortOrder = 'app/setSortOrder',
  LoadGuitarsRequest = 'data/loadGuitarsRequest',
  LoadGuitarsSuccess = 'data/loadGuitarsSuccess',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
