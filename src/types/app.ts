
import { GuitarType, GuitarsList, CompleteGuitar, Comment } from './types';

export type AppData = {
  guitarsSearch: GuitarsList;
  guitarsShow: CompleteGuitar[];
  priceStart: number,
  priceEnd: number,
  guitarCount: number | null,
  isLoading: boolean,
  currentGuitars: GuitarType,
  currentComments: Comment[],
  commentsCounter: number,
  isReviewOpen: boolean,
  isSuccessOpen: boolean,
  tempItemCart: GuitarType;
  productsInCart: GuitarType[];
  isCartAddOpen: boolean,
  isCartDeleteOpen: boolean,
  isCartSuccessOpen: boolean,
};
