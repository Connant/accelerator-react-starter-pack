
export enum APIRoute {
  Guitars = '/guitars',
  Guitar = 'guitars/:id',
  Comments = '/guitars/:id/comments',
}


export enum AppRoute {
  Main = '/',
  Cart = '/cart',
  CardPage = 'guitars/:id',
  Guitars = '/guitars',
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

export enum StatusLoading {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export const REQUEST_DELAY = 1000;
