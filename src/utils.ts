import { RATING_STARTS_WITH, RATING_STARS_COUNT, FilterState, SortState, NUMBER_OF_CARDS } from './const';
import queryString from 'query-string';
import { Comment, InCart } from './types/types';

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

export const getCommentsSortByDate = (comments: Comment[]): Comment[] =>
  [...comments].sort((objA, objB) => Date.parse(objB.createAt) - Date.parse(objA.createAt));

export const isEscEvent = (evt: KeyboardEvent): boolean => evt.key === 'Escape' || evt.key === 'Esc';

export const getSumValues = (object: InCart): number => {
  const values = Object.values(object);
  return values.length !== 0 ? values.reduce((sum, item) => sum = sum+item) : 0;
};

export const getAllIDs = (object: InCart): number[] =>
  Object.entries(object)
    .reduce((allIDs: number[], [key, value]) => {
      const currentIDs = new Array(value).fill(Number(key));
      return [...allIDs, ...currentIDs];
    }, [] as number[]);
