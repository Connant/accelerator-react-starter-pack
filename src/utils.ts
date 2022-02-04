import { RATING_STARTS_WITH, RATING_STARS_COUNT, FilterState, SortState, NUMBER_OF_CARDS } from './const';
import queryString from 'query-string';

export function replaceImagePath(receivedPath:string, replace = 'img', clientPath = '/img/content') {
  return receivedPath.replace(replace, clientPath);
}

export function createRangeList(from: number, to: number) {
  return Array.from({length: to}, (_, index) => index + from);
}

export const ratingList = createRangeList(RATING_STARTS_WITH, RATING_STARS_COUNT);

export const allRequest = ( page: number | undefined, filter: FilterState, sorting: SortState) =>  {

  const end = page ? + page * NUMBER_OF_CARDS : NUMBER_OF_CARDS;
  const start = end - NUMBER_OF_CARDS;

  const pageRequest = queryString.stringify(
    { _start: start,
      _end: end,
    }, {},
  );

  const filterdQuery = queryString.stringify(
    { type: filter.guitarTypes,
      stringCount: filter.stringCounts,
      'price_gte': filter.minPrice,
      'price_lte': filter.maxPrice,
    }, {skipEmptyString: true},
  );

  const sortQuery = queryString.stringify(
    { _sort: sorting.sort,
      _order: sorting.order,
    }, {skipEmptyString: true, skipNull: true},
  );

  const request = [pageRequest, filterdQuery, sortQuery].filter((query) =>
    query !== '' && query !== undefined).join('&');

  return `/?${request}`;
};
