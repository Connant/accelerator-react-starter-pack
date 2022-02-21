import { configureStore } from '@reduxjs/toolkit';
import { api } from '../service/api';
import { RootReducer, redirect } from './root-reducer';


export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }).concat(redirect),
});
