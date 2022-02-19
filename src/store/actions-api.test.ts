import { Action } from 'redux';
import { APIRoute, FIRST_GUITAR } from '../const';
import { CreateFakeGuitar, fakeComments, CreateFakeComment, fakeGuitars, fakeProducts, MockCLIENT } from '../mocks/mocks';
import { HttpCode, HEADER_TOTAL_COUNT, api } from '../service/api';
import { GuitarType } from '../types/types';
import { fetchCurrentGuitar, fetchFilteredGuitars, fetchGuitarsPrice, fetchGuitarsSearch, fetchMaxGuitarsPrice, fetchSortedGuitars, postComment } from './actions-api';
import { setFilter, setSort } from './redusers/client-reduser/client-reducer';
import { toggleIsLoading, addPriceEnd, addPriceStart, addCurrentComments, addNewComment, toggleIsReviewOpen, toggleIsSuccessOpen, addGuitarssCount, addGuitarssSearch, addGuitarssShow, clearGuitarssCount, addCurrentGuitar } from './redusers/data-reducer/data-reducer';
import MockAdapter from 'axios-mock-adapter';
import { allRequest } from '../utils';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';

jest.mock('../utils');
const createFakeQuery = allRequest as jest.MockedFunction<typeof allRequest>;
describe('Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  const PRODUCT_KEY = 'key';
  const FAKE_QUERY = '?name=СURT&type=electric';
  const FAKE_COUNT = 20;
  const FAKE_PAGE = 1;
  const FAKE_NEW_PAGE = 5;
  const EMPTY_DATA = [] as GuitarType[];
  const FAKE_SEARCH_QUERY = true;
  const FAKE_ID = '1';
  const FAKE_PRODUCT_INFO = CreateFakeGuitar();
  const FAKE_COMMENTS = fakeComments;
  const FAKE_PRODUCT = {...FAKE_PRODUCT_INFO, comments: FAKE_COMMENTS};
  const FAKE_COMMENT = CreateFakeComment();
  const NewComment = {
    guitarId: 1,
    userName: 'user',
    advantage: 'advantage',
    disadvantage: 'disadvantage',
    comment: 'comment',
    rating: 7,
  };

  it('should dispatch addGuitarssSearch with fetchGuitarsSearch when GET /name_like & HttpCode.OK', async () => {
    mockAPI.onGet(`${APIRoute.Guitars}?name_like=${PRODUCT_KEY}`).reply(HttpCode.OK, fakeGuitars);
    const store = mockStore({CLIENT: {...MockCLIENT, searchCriteria: PRODUCT_KEY}});
    await store.dispatch(fetchGuitarsSearch(PRODUCT_KEY));
    expect(store.getActions()).toEqual([{ payload: fakeGuitars, type: addGuitarssSearch.type }]);
  });

  it('shouldnt dispatch addGuitarsSearch GET /name_like & HttpCode.OK but searchKey already is empty', async () => {
    mockAPI.onGet(`${APIRoute.Guitars}?name_like=${PRODUCT_KEY}`).reply(HttpCode.OK, fakeGuitars);
    const store = mockStore({CLIENT: {...MockCLIENT, searchCriteria: ''}});
    await store.dispatch(fetchGuitarsSearch(PRODUCT_KEY));
    expect(store.getActions()).toEqual([]);
  });

  it('should dispatch addGuitarsCount, addGuitarssShow, setFilter and redirect to first page when GET filter & HttpCode.OK', async () => {
    mockAPI.onGet(`${APIRoute.Guitars}${FAKE_QUERY}`).reply(HttpCode.OK, fakeProducts, {[HEADER_TOTAL_COUNT]:FAKE_COUNT});
    const store = mockStore({CLIENT: MockCLIENT});
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await
    store.dispatch(fetchFilteredGuitars(MockCLIENT.filter, FAKE_NEW_PAGE));
    expect(createFakeQuery).toBeCalled();
  });

  it('should not redirect to first page when GET filter with page & HttpCode.OK', async () => {
    mockAPI.onGet(`${APIRoute.Guitars}${FAKE_QUERY}`).reply(HttpCode.OK, fakeProducts, {[HEADER_TOTAL_COUNT]:FAKE_COUNT});
    const store = mockStore({CLIENT: MockCLIENT});
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await
    store.dispatch(fetchFilteredGuitars(MockCLIENT.filter, FAKE_PAGE));
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      clearGuitarssCount(),
      { payload: FAKE_COUNT, type: addGuitarssCount.type },
      { payload: fakeProducts, type: addGuitarssShow.type },
      { payload: MockCLIENT.filter, type: setFilter.type },
      toggleIsLoading(false),
    ]);
    expect(createFakeQuery).toBeCalled();
  });

  it('should redirect to not found page when GET filter & data: empty [] & firstQuery', async () => {
    mockAPI.onGet(`${APIRoute.Guitars}${FAKE_QUERY}`).reply(HttpCode.OK, EMPTY_DATA, {[HEADER_TOTAL_COUNT]:FAKE_COUNT});
    const store = mockStore({CLIENT: MockCLIENT});
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await
    store.dispatch(fetchFilteredGuitars(MockCLIENT.filter, FAKE_NEW_PAGE, FAKE_SEARCH_QUERY));
  });

  it('should dispatch addGuitarssShow, setSort when GET sort & HttpCode.OK', async () => {
    mockAPI.onGet(`${APIRoute.Guitars}${FAKE_QUERY}`).reply(HttpCode.OK, fakeProducts);
    const store = mockStore({CLIENT: MockCLIENT});
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await
    store.dispatch(fetchSortedGuitars(FAKE_PAGE, MockCLIENT.sort));
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      addGuitarssShow(fakeProducts),
      setSort(MockCLIENT.sort),
      toggleIsLoading(false),
    ]);
    expect(createFakeQuery).toBeCalled();
  });

  it('should dispatch addPriceEnd when GET price max & HttpCode.OK', async () => {
    mockAPI.onGet(`${APIRoute.Guitars}?_sort=price&_start=${FAKE_COUNT - 1}&_end=${FAKE_COUNT}`).reply(HttpCode.OK, fakeGuitars);
    const store = mockStore();
    await
    store.dispatch(fetchMaxGuitarsPrice(FAKE_COUNT));
    expect(store.getActions()).toEqual([addPriceEnd(fakeGuitars[FIRST_GUITAR].price)]);
  });

  it('should dispatch addPriceStart when GET price & HttpCode.OK', async () => {
    mockAPI.onGet(`${APIRoute.Guitars}?_sort=price&_start=${FIRST_GUITAR}&_end=${FIRST_GUITAR+1}`).reply(HttpCode.OK, fakeGuitars, {[HEADER_TOTAL_COUNT]:FAKE_COUNT});
    const store = mockStore();
    await
    store.dispatch(fetchGuitarsPrice());
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      addPriceStart(fakeGuitars[FIRST_GUITAR].price),
      toggleIsLoading(false),
    ]);
  });

  it('should dispatch addCurrentProduct, addCurrentComments with fakeProduct when GET ?_embed=comments & HttpCode.OK', async () => {
    mockAPI.onGet(`${APIRoute.Guitars}/${FAKE_ID}?_embed=comments`).reply(HttpCode.OK, FAKE_PRODUCT);
    const store = mockStore();
    await store.dispatch(fetchCurrentGuitar(FAKE_ID));
    expect(store.getActions()).toEqual([
      { payload: FAKE_PRODUCT_INFO, type: addCurrentGuitar.type },
      { payload: FAKE_COMMENTS, type: addCurrentComments.type },
    ]);
  });

  it('should dispatch toggleIsReviewOpen, toggleIsSuccessOpen, addNewComment with FAKE_COMMENT when POST /comments & HttpCode.OK', async () => {
    mockAPI.onPost(APIRoute.Comments).reply(HttpCode.OK, FAKE_COMMENT);
    const store = mockStore();
    await store.dispatch(postComment(NewComment));
    expect(store.getActions()).toEqual([
      { payload: FAKE_COMMENT, type: addNewComment.type },
      { payload: false, type: toggleIsReviewOpen.type },
      { payload: true, type: toggleIsSuccessOpen.type },
    ]);
  });

  it('should call toast if POST /comments & HttpCode.BadRequest', async () => {
    mockAPI.onPost(APIRoute.Comments).reply(HttpCode.BadRequest, FAKE_COMMENT);
    const store = mockStore();
    await store.dispatch(postComment(NewComment));
    expect(store.getActions()).toEqual([]);
  });

  it('should redirect to 404 page when GET ?_embed=comments & HttpCode.NotFound', async () => {
    mockAPI.onGet(`${APIRoute.Guitars}/${FAKE_ID}?_embed=comments`).reply(HttpCode.NotFound);
    const store = mockStore();
    await store.dispatch(fetchCurrentGuitar(FAKE_ID));
  });
});
