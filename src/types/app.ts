
import { GuitarType, GuitarsList, CompleteGuitar } from './types';
import { Comment } from './types';

export type AppData = {
  guitarsSearch: GuitarsList;
  guitarsShow: CompleteGuitar[];
  priceStart: number,
  priceEnd: number,
  productsCount: number|null,
  isLoading: boolean,
  currentGuitars: GuitarType,
  currentComments: Comment[],
};
