import { RATING_STARTS_WITH, RATING_STARS_COUNT } from './const';
import { GuitarType } from './types/guitar';

const IMAGE = 'img';
const CLIENT_IMAGE = 'img/content';


export function replaceImagePath(receivedPath:string, replace = IMAGE, clientPath = CLIENT_IMAGE) {
  return receivedPath.replace(replace, clientPath);
}

export function createRangeList(from: number, to: number) {
  return Array.from({length: to}, (_, index) => index + from);
}

export const ratingList = createRangeList(RATING_STARTS_WITH, RATING_STARS_COUNT);

export const getGuitarStrings = (guitarsList: GuitarType[]) => Array
  .from(guitarsList)
  .sort()
  .reduce((el: {[key: string]: number[]}, guitar) => {
    if(!el[guitar.type]) {
      el[guitar.type] = [];
    }

    if ((!el[guitar.type].includes(guitar.stringCount))) {
      (el[guitar.type]).push(guitar.stringCount);
      (el[guitar.type]).sort((firstStringCount: number, secondStringCount: number) => firstStringCount - secondStringCount);
    }

    return el;
  }, {});
