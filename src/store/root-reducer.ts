import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './app-reducer';
import { mainReducer } from './reducer';

export enum NameSpace {
  Main = 'MAIN',
  App = 'APP',
}

export const rootReducer = combineReducers({
  [NameSpace.Main]: mainReducer,
  [NameSpace.App]: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
