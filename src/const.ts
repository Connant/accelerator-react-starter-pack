
export const TOTAL_COUNT = 'x-total-count';

export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
}

export enum AppRoute {
  Main = '/',
  Cart = '/cart',
  CardPage = 'guitars/:id',
  ListPage = '/catalog/page_:number',
  Error = 'page404',
}

export const REQUEST_DELAY = 300;

export const STAR_FULL_ICON = 'icon-full-star';
export const STAR_ICON = 'icon-star';
export const RATING_STARTS_WITH = 1;
export const RATING_STARS_COUNT = 5;

export const FIRST_GUITAR = 0;
export const ALL_GUITARS = 27;
export const PAGINATION_DEFAULT_PAGE = 1;
export const PAGINATION_STEP = 1;
export const NUMBER_OF_CARDS = 9;
export const PAGES_SHOWN = 3;

export const nextPage = 'Далее';
export const backPage = 'Назад';


export type FilterState = {
  guitarTypes: string [],
  stringCounts: string [],
  minPrice: string,
  maxPrice: string,
}

export type SortState = {
  sort: string,
  order: string,
}

export const GuitarSpecifications = new Map([
  ['acoustic', ['6', '7', '12']],
  ['electric', ['4', '6', '7']],
  ['ukulele', ['4']],
]);

export const StringCount = new Map([
  ['four', { id: '4-strings', stringCount: '4' }],
  ['six', { id: '6-strings', stringCount: '6' }],
  ['seven', { id: '7-strings', stringCount: '7' }],
  ['twelve', { id: '12-strings', stringCount: '12' }],
]);

export type GuitarType = {
  id: string;
  title: string;
  type: string
};

export const GuitarsType = new Map([
  ['acoustic', {id: 'acoustic', title: 'Акустические гитары', type: 'Аккустическая гитара'}],
  ['electric', {id: 'electric', title: 'Электрогитары', type: 'Электрогитара'}],
  ['ukulele', {id: 'ukulele', title: 'Укулеле', type: 'Укулеле'}],
]);

export enum SortingMethod {
  Price = 'price',
  Rating = 'rating',
}

export enum OrderOption {
  Asc = 'asc',
  Desc = 'desc',
}

export enum Reducer {
  Data = 'DATA',
  Client = 'CLIENT',
}

export enum Slice {
  AppData = 'data',
  AppClient = 'client',
}
