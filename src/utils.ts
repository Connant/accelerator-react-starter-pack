/* eslint-disable no-console */
import { RATING_STARTS_WITH, RATING_STARS_COUNT, FilterState, SortState, NUMBER_OF_CARDS } from './const';
import { GuitarType } from './types/types';
import queryString from 'query-string';

export function replaceImagePath(receivedPath:string, replace = 'img', clientPath = '/img/content') {
  return receivedPath.replace(replace, clientPath);
}

export function createRangeList(from: number, to: number) {
  return Array.from({length: to}, (_, index) => index + from);
}

export const ratingList = createRangeList(RATING_STARTS_WITH, RATING_STARS_COUNT);

export function getArray(start: number, end: number): ReadonlyArray<number> {
  return (
    [...Array(end - start + 1).keys()].map((i) => i + start)
  );
}

export const getSortedGuitars = (products: GuitarType[], key: string): GuitarType[] => {
  const searchKey = key.toLowerCase();
  return [...products].sort((a,b)=>a.name.toLowerCase().indexOf(searchKey)-b.name.toLowerCase().indexOf(searchKey));
};

export const filterRequest = (filter: FilterState) =>  {
  const filterdQuery = queryString.stringify(
    { type: filter.guitarTypes,
      stringCount: filter.stringCounts,
      'price_gte': filter.minPrice,
      'price_lte': filter.maxPrice,
    }, {skipEmptyString: true},
  );
  return filterdQuery;
};

export const sortRequest = (sorting: SortState) => {
  const sortQuery = queryString.stringify(
    { _sort: sorting.sort,
      _order: sorting.order,
    }, {skipEmptyString: true},
  );
  return sortQuery;
};

export const pageRequest = (page: number | undefined) => {
  const productEnd = page ? + page * NUMBER_OF_CARDS : NUMBER_OF_CARDS;
  const productStart = productEnd - NUMBER_OF_CARDS;
  return queryString.stringify(
    { _start: productStart,
      _end: productEnd,
    }, {},
  );
};

export const request = (page: number | undefined, filter: FilterState, sort: SortState):string => {
  const allRequest = [filterRequest(filter), sortRequest(sort), pageRequest(page)].filter((query) =>
    query !== '' && query !== undefined).join('&');
  return `/?${allRequest}`;
};
