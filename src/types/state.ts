import { GuitarsList } from './guitar';
import { RootState } from '../store/root-reducer';

export type BasicData = {
  guitarsList: GuitarsList,
  isDataLoaded: boolean,
};

export type State = RootState;
