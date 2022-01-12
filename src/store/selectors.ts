import { State } from '../types/state';
import { GuitarsList } from '../types/guitar';
import { NameSpace } from './root-reducer';
import { OrderOption, SortingMethod } from '../const';

export const getGuitarsList = (state: State): GuitarsList => state[NameSpace.Main].guitarsList;
export const selectSortType = (state: State): SortingMethod => state[NameSpace.App].SortingMethod;
export const selectSortOrder = (state: State): OrderOption | '' => state[NameSpace.App].sortOrder;


