import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import { CreateFakeGuitar, MockDATA, MockCLIENT } from '../../mocks/mocks';
import { searchCriteria } from '../../store/redusers/client-reduser/client-reducer';
import { clearGuitarssSearch } from '../../store/redusers/data-reducer/data-reducer';
import { customRenderProvider } from '../../test-utils';
import { GuitarType } from '../../types/types';
import SearchBox from './search-box';


const NAME_COUNT = 3;
const NAME = 'name';
const ID = 1;

jest.mock('../../store/redusers/client-reduser/client-reducer');
jest.mock('../../store/actions-api');
jest.mock('../../store/redusers/data-reducer/data-reducer');
const fakeClearGuitarsSearch = clearGuitarssSearch as jest.MockedFunction<typeof clearGuitarssSearch>;
const fakeSetSearchKey = searchCriteria as jest.MockedFunction<typeof searchCriteria>;

const history = createMemoryHistory();
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();

const GuitarsWithFirstName = new Array(NAME_COUNT)
  .fill(null)
  .map((product, index) => {
    product = CreateFakeGuitar();
    product.name = NAME;
    product.id = index + ID;
    return product;
  }) as GuitarType[];

const componentState = {
  DATA: MockDATA,
  CLIENT: MockCLIENT,
};
const KEY = 'key';

describe('Component: SearchBox', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderProvider(<SearchBox />, store);
    expect(screen.getByPlaceholderText(/что вы ищите?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
    expect(screen.getByRole('list', { hidden: true })).toBeInTheDocument();
  });

  it('should render correctly when get GuitarsSearch', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({
      ...componentState,
      DATA: { MockDATA, GuitarsSearch: [...GuitarsWithFirstName] },
      CLIENT: { MockCLIENT, searchKey: NAME },
    });
    customRenderProvider(<SearchBox />, store);
    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
    expect(screen.getByRole('list', { hidden: false })).toBeInTheDocument();
  });

  it('should dispatch setSearchKey correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderProvider(<SearchBox />, store);
    userEvent.type(screen.getByRole('textbox'), 'a');
    userEvent.type(screen.getByRole('textbox'), 'b');
    expect(fakeClearGuitarsSearch).not.toBeCalled();
    userEvent.type(screen.getByRole('textbox'), '');
    expect(fakeSetSearchKey).toBeCalledTimes(2);
  });

  it('should dispatch fetchGuitarsSearch correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({
      ...componentState,
      CLIENT: { MockCLIENT, searchKey: KEY },
    });
    customRenderProvider(<SearchBox />, store);
  });

  it('should redirect when user clicked on links', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({
      ...componentState,
      DATA: { MockDATA, GuitarsSearch: [...GuitarsWithFirstName] },
      CLIENT: { MockCLIENT, searchKey: NAME },
    });
    history.push(`/${AppRoute.Main}`);
    render(
      <Redux.Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Main} element={<SearchBox />} />
            <Route path={`/guitar/${ID}`} element={<h1>Товар</h1>} />
          </Routes>
        </BrowserRouter>
      </Redux.Provider>);

    expect(screen.queryByAltText(/Товар/i)).not.toBeInTheDocument();
  });
});
