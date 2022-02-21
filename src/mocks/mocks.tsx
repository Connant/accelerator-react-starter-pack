
import { DEFAULT_COMMENTS_COUNT } from '../const';
import { AppClient } from '../store/redusers/client-reduser/client-reducer';
import { AppData } from '../types/app';
import { GuitarType } from '../types/types';
import { datatype, random, image, name} from 'faker';


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

const COMMENTS_LENGTH = 5;
const GUITARS_LENGTH = 9;


export const CreateFakeComment = () => ({
  id: datatype.number(50).toString(),
  userName: name.title(),
  advantage: datatype.string(7),
  disadvantage: datatype.string(10),
  comment: datatype.string(10),
  rating: datatype.number(5),
  createAt: datatype.string(10),
  guitarId: datatype.number(5),
});

export const CreateFakeCommentsList = (value: number) => new Array(value).fill(null).map(() => CreateFakeComment());

export const CreateFakeGuitar = () => ({
  comments: CreateFakeCommentsList(7),
  id: datatype.number(500),
  name: name.title(),
  vendorCode: name.title(),
  type: random.word(),
  description: datatype.string(10),
  previewImg: image.image(),
  stringCount: datatype.number(12),
  rating: datatype.number(5),
  price: datatype.number(100),
});

export const makeFakeGuitarsList = (value: number): GuitarType[] => new Array(value).fill(null).map(() => CreateFakeGuitar());


export const fakeComments = new Array(COMMENTS_LENGTH).fill(null).map(CreateFakeComment);

export const fakeGuitars = new Array(GUITARS_LENGTH).fill(null).map(CreateFakeGuitar);

export const fakeProduct = { ...CreateFakeGuitar(), comments: fakeComments };

export const fakeProducts = new Array(GUITARS_LENGTH).fill(null).map((el) => el = { ...CreateFakeGuitar(), comments: fakeComments });

