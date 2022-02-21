import { DEFAULT_COMMENTS_COUNT } from '../../../const';
import { CreateFakeGuitar, CreateFakeComment, fakeGuitars, fakeProducts, fakeComments } from '../../../mocks/mocks';
import { AppData } from '../../../types/app';
import { GuitarType } from '../../../types/types';
import appData, { addPriceStart, addPriceEnd, addCurrentComments, clearCurrentComments, addNewComment, incrementCommentsCounter, resetCommentsCounter, addCurrentGuitar, addGuitarssSearch, addGuitarssShow, clearCurrentGuitar, clearGuitarssSearch } from './data-reducer';


export const initialState: AppData = {
  guitarsSearch: [],
  guitarsShow: [],
  priceEnd: 0,
  priceStart: 0,
  guitarCount: null,
  isLoading: true,
  currentGuitars: {} as GuitarType,
  currentComments: [],
  commentsCounter: DEFAULT_COMMENTS_COUNT,
  isReviewOpen: false,
  isSuccessOpen: false,
};

const FAKE_PRICE = 1;
const FAKE_PRODUCT = CreateFakeGuitar();
const FAKE_COMMENT = CreateFakeComment();
const FAKE_COMMENT_COUNTER = 6;

describe('Reducer: appData', () => {
  let state = initialState;
  beforeAll(() => { state = initialState; });

  it('without additional parameters should return initial state', () => {
    expect(appData(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should update guitarsSearch by addGuitarssSearch', () => {
    expect(appData(state, addGuitarssSearch(fakeGuitars))).toEqual({
      ...state,
      guitarsSearch: fakeGuitars,
    });
  });

  it('should clear guitarsSearch by clearProductsSearch', () => {
    state = { ...state, guitarsSearch: fakeGuitars };
    expect(appData(state, clearGuitarssSearch())).toEqual(initialState);
  });

  it('should update guitarsShow by addProductsShow', () => {
    expect(appData(state, addGuitarssShow(fakeProducts))).toEqual({
      ...state,
      guitarsShow: fakeProducts,
    });
  });

  it('should update priceStart by addPriceStart', () => {
    expect(appData(state, addPriceStart(FAKE_PRICE))).toEqual({
      ...state,
      priceStart: FAKE_PRICE,
    });
  });
  it('should update priceEnd by addPriceEnd', () => {
    expect(appData(state, addPriceEnd(FAKE_PRICE))).toEqual({
      ...state,
      priceEnd: FAKE_PRICE,
    });
  });
  it('should update currentGuitars by addCurrentGuitar', () => {
    expect(appData(state, addCurrentGuitar(FAKE_PRODUCT))).toEqual({
      ...state,
      currentGuitars: FAKE_PRODUCT,
    });
  });
  it('should clear currentGuitars by clearCurrentGuitar', () => {
    state = { ...initialState, currentGuitars: FAKE_PRODUCT };
    expect(appData(state, clearCurrentGuitar())).toEqual(initialState);
  });
  it('should update currentComments by addCurrentComments', () => {
    expect(appData(state, addCurrentComments(fakeComments))).toEqual({
      ...state,
      currentComments: fakeComments,
    });
  });
  it('should clear currentComments by clearCurrentComments', () => {
    state = { ...initialState, currentComments: fakeComments };
    expect(appData(state, clearCurrentComments())).toEqual(initialState);
  });
  it('should update currentComments by addNewComment', () => {
    state = { ...initialState, currentComments: fakeComments };
    expect(appData(state, addNewComment(FAKE_COMMENT))).toEqual({
      ...state,
      currentComments: [FAKE_COMMENT, ...fakeComments],
    });
  });
  it('should not update commentsCounter by incrementCommentsCounter if currentComments.length < commentCounter', () => {
    state = { ...initialState };
    expect(appData(state, incrementCommentsCounter())).toEqual({
      ...initialState,
    });
  });
  it('should update commentsCounter by incrementCommentsCounter', () => {
    state = { ...initialState, currentComments: fakeComments };
    expect(appData(state, incrementCommentsCounter())).toEqual({
      ...initialState,
      currentComments: fakeComments,
      commentsCounter: initialState.commentsCounter + DEFAULT_COMMENTS_COUNT,
    });
  });
  it('should reset commentsCounter by resetCommentsCounter', () => {
    state = { ...initialState, commentsCounter: FAKE_COMMENT_COUNTER };
    expect(appData(state, resetCommentsCounter())).toEqual({
      ...initialState,
    });
  });
});
