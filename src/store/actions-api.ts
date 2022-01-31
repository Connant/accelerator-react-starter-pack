/* eslint-disable no-console */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FilterState, FIRST_GUITAR, PAGINATION_DEFAULT_PAGE, SortState, TOTAL_COUNT, APIRoute } from '../const';
import { ThunkActionResult } from '../types/actions';
import { CompleteGuitar, GuitarType, GuitarsList } from '../types/types';
import { request } from '../utils';
import { addGuitarssSearch, toggleIsLoading, clearGuitarssCount, addGuitarssCount, addGuitarssShow, addPriceStart, addPriceEnd } from './redusers/data-reducer';
import { setFilter, setSort } from './redusers/client-reducer';

export const fetchGuitarsSearch = (searchKey: string): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {

    try {
      const { data } = await api.get<GuitarsList>(`${APIRoute.Guitars}?name_like=${searchKey}`);
      if (getState().CLIENT.searchKey === '') {
        return;
      }
      dispatch(addGuitarssSearch(data));
    }

    catch {
      toast.error('Что-то пошло не так...', {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.clearWaitingQueue();
    }
  };

export const fetchFilteredGuitars = (filter: FilterState, page: number, searchRequest?:boolean): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {

    const currentPage = searchRequest ? page : PAGINATION_DEFAULT_PAGE;
    console.log(`currentPage=${currentPage}`);
    const sort = getState().CLIENT.sort;
    const query = request(currentPage, filter, sort);
    dispatch(toggleIsLoading(true));
    dispatch(clearGuitarssCount());

    try {
      const { data, headers } = await api.get<GuitarType[]>(`${APIRoute.Guitars}${query}`);
      const productsTotalCount = headers[TOTAL_COUNT];
      if ((data.length === 0)&&(searchRequest)) {
        throw new Error('Произошла ошибка, попробуйте позже');
      }
      dispatch(addGuitarssCount(productsTotalCount));
      dispatch(addGuitarssShow(data));
      dispatch(setFilter(filter));
    }

    catch {
      toast.error('Что-то пошло не так...', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    dispatch(toggleIsLoading(false));
  };

export const fetchSortedGuitars = (page: number, sort: SortState): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {

    const filter = getState().CLIENT.filter;
    const query = request(page, filter, sort);

    try {
      const { data } = await api.get<CompleteGuitar[]>(`${APIRoute.Guitars}${query}`);
      dispatch(addGuitarssShow(data));
      dispatch(setSort(sort));
    }

    catch {
      toast.error('Что-то пошло не так...', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    dispatch(toggleIsLoading(false));
  };

export const fetchMaxGuitarsPrice = (productsCount: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {

    try {
      const { data } = await api.get<GuitarType[]>(`${APIRoute.Guitars}?_sort=price&_start=${productsCount - 1}&_end=${productsCount}`);
      dispatch(addPriceEnd(data[FIRST_GUITAR].price));
    }

    catch {
      toast.error('Что-то пошло не так...', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

export const fetchGuitarsPrice = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(toggleIsLoading(true));
    try {
      const { data, headers } = await api.get<GuitarType[]>(
        `${APIRoute.Guitars}?_sort=price&_start=${FIRST_GUITAR}&_end=${
          FIRST_GUITAR + 1
        }`,
      );
      dispatch(addPriceStart(data[FIRST_GUITAR].price));
      dispatch(fetchMaxGuitarsPrice(headers[TOTAL_COUNT]));
      // eslint-disable-next-line no-console
      // console.log(headers[TOTAL_COUNT]);
    } catch {
      toast.error('Что-то пошло не так...', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    dispatch(toggleIsLoading(false));
  };

