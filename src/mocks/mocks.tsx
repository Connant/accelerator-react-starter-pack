
import { DEFAULT_COMMENTS_COUNT } from '../const';
import { AppClient } from '../store/redusers/client-reduser/client-reducer';
import { AppData } from '../types/app';
import { GuitarType, Comment } from '../types/types';
import { lorem, datatype, commerce, random, image, date, name} from 'faker';
import { customAlphabet } from 'nanoid';


//  https://habr.com/ru/post/248999/

export const MockDATA: AppData = {
  guitarsSearch: [],
  guitarsShow: [],
  priceEnd: 0,
  priceStart: 0,
  guitarCount: null,
  isLoading: true,
  currentComments: [],
  currentGuitars: {} as GuitarType,
  commentsCounter: DEFAULT_COMMENTS_COUNT,
  isReviewOpen: false,
  isSuccessOpen: false,
};

export const MockCLIENT: AppClient = {
  sort: {
    sort: '',
    order: '',
  },
  filter: {
    guitarTypes: [],
    stringCounts: [],
    minPrice: '',
    maxPrice: '',
  },
  searchCriteria: '',
};


const STRINGS: number[] = [4, 6, 7, 12];
const TYPES: string[] = ['ukulele', 'acoustic', 'electric'];
const COMMENT_ID = 1;
const COMMENTS_LENGTH = 5;
const GUITARS_LENGTH = 10;
const nanoid = customAlphabet('1234567890', 5);

export const CreateFakeGuitar = (): GuitarType => ({
  id: parseInt(nanoid(), 10),
  name: name.firstName(),
  description: lorem.sentences(datatype.number(3)),
  rating: datatype.float({ max: 5 }),
  price: Number(commerce.price()),
  vendorCode: lorem.word(),
  type: random.arrayElement(TYPES),
  previewImg: image.imageUrl(),
  stringCount: random.arrayElement(STRINGS),
});

export const CreateFakeComment = (): Comment => ({
  id: nanoid(),
  userName: name.firstName(),
  advantage: lorem.word(),
  disadvantage: lorem.word(),
  comment: lorem.sentences(datatype.number(3)),
  rating: datatype.float({ max: 5 }),
  createAt: date.past().toString(),
  guitarId: COMMENT_ID,
});

export const fakeComments = new Array(COMMENTS_LENGTH).fill(null).map(CreateFakeComment);

export const fakeGuitars = new Array(GUITARS_LENGTH).fill(null).map(CreateFakeGuitar);

export const fakeProduct = { ...CreateFakeGuitar(), comments: fakeComments };

export const fakeProducts = new Array(GUITARS_LENGTH).fill(null).map((el) => el = { ...CreateFakeGuitar(), comments: fakeComments });

