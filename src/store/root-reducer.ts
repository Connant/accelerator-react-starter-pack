import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './redusers/app-reducer';
import { mainReducer } from './redusers/main-reducer';
import { searchReducer } from './redusers/search-reducer';

export enum NameSpace {
  Main = 'MAIN',
  App = 'APP',
  Search = 'SEARCH',
}

export const rootReducer = combineReducers({
  [NameSpace.Main]: mainReducer,
  [NameSpace.App]: appReducer,
  [NameSpace.Search]: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
