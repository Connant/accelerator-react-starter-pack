import { combineReducers, createAction, Middleware } from '@reduxjs/toolkit';
import browserHistory from '../browser-history/browser-history';
import { AppRoute, Reducer } from '../const';
import appDataReducer from './redusers/data-reducer';
import appClientSlice from './redusers/client-reducer';

export enum middleware {
  RedirectToRoute = 'app/redirectToRoute',
}

export const redirect: Middleware<unknown, State> =
  (_store) => (next) => (action) => {
    if (action.type === middleware.RedirectToRoute) {
      browserHistory.push(action.payload);
    }
    return next(action);
  };


export const redirectToRoute = createAction(
  middleware.RedirectToRoute,
  (url: AppRoute) => ({ payload: url }));


export const RootReducer = combineReducers({
  [Reducer.Data]: appDataReducer,
  [Reducer.Client]: appClientSlice,
});

export type RootState = ReturnType<typeof RootReducer>;

export type State = RootState;
