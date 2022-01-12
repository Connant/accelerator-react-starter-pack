import { RATING_STARTS_WITH, RATING_STARS_COUNT } from './const';

const IMAGE = 'img';
const CLIENT_IMAGE = 'img/content';


export const ratingList = createRangeList(RATING_STARTS_WITH, RATING_STARS_COUNT);

export function replaceImagePath(receivedPath:string, replace = IMAGE, clientPath = CLIENT_IMAGE) {
  return receivedPath.replace(replace, clientPath);
}

export function createRangeList(from: number, to: number) {
  return Array.from({length: to}, (_, index) => index + from);
}
