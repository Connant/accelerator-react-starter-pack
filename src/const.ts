
export enum APIRoute {
  Guitars = '/guitars',
  Guitar = 'guitars/:id',
  Comments = '/guitars/:id/comments',
}

export enum AppRoute {
  Main = '/',
  Cart = '/cart',
  CardPage = '/cardpage'
}

export enum SortType {
  Price = 'По цене',
  Popularity = 'По популярности',
  Ascend = 'По возрастанию',
  Descend = 'По убыванию'
}

export const STAR_FULL_ICON = 'icon-full-star';
export const STAR_ICON = 'icon-star';
export const RATING_STARTS_WITH = 1;
export const RATING_STARS_COUNT = 5;

export enum TypeGuitar {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum requestParameters {
  Sort = '_sort',
  Order = '_order',
  Start = '_start',
  Limit = '_limit',
  PriceGte = 'price_gte',
  PriceLte = 'price_lte',
  NameLike = 'name_like',
  Embed = '_embed',
  Type = 'type',
  StringCount = 'stringCount',
}

export enum numberOfString {
  FourStrings = '4-strings',
  SixStrings = '6-strings',
  SevenStrings = '7-strings',
  TwelveStrings = '12-strings',
}

export const DEFAULT_PAGE = 1;

export enum SortingMethod {
  Price = 'price',
  Rating = 'rating',
}

export enum OrderOption {
  Asc = 'asc',
  Desc = 'desc',
}

export const sortTypeButton = 'catalog-sort__type-button';
export const sortOrderButton = 'catalog-sort__order-button';

