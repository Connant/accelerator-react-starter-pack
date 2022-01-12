import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';
import { GuitarsList, GuitarType } from '../types/guitar';
import { OrderOption, SortingMethod } from '../const';

export const setFillingGuitarsList = createAction(
  ActionType.setFillingGuitarsList, (guitarsList: GuitarsList) => ({
    payload: guitarsList,
  }),
);


export const setSortingMethod = createAction(
  ActionType.setSortingMethod, (sortingMethod: SortingMethod) => ({
    payload: {
      sortingMethod,
    },
  }),
);

export const setSortOrder = createAction(
  ActionType.setSortOrder, (sortOrder: OrderOption | '') => ({
    payload: {
      sortOrder,
    },
  }),
);

export const loadGuitarsRequest = createAction(ActionType.LoadGuitarsRequest);

export const loadGuitarsSuccess = createAction(
  ActionType.LoadGuitarsSuccess, (guitars: GuitarType[]) => ({
    payload: {
      guitars,
    },
  }),
);


