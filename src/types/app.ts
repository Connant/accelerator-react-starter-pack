
import { GuitarType, GuitarsList, CompleteGuitar, Comments } from './types';
// import { Comment } from './types';

export type AppData = {
  guitarsSearch: GuitarsList;
  guitarsShow: CompleteGuitar[];
  priceStart: number,
  priceEnd: number,
  guitarCount: number | null,
  isLoading: boolean,
  currentGuitars: GuitarType,
  currentComments: Comments,
};
