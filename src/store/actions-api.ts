import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FilterState, FIRST_GUITAR, PAGINATION_DEFAULT_PAGE, SortState, TOTAL_COUNT, APIRoute, AppRoute, CouponError } from '../const';
import { ThunkActionResult } from '../types/actions';
import { CompleteGuitar, GuitarType, GuitarsList, CommentPost, Comment, Order } from '../types/types';
import { allRequest } from '../utils';
import { addGuitarssSearch, toggleIsLoading, clearGuitarssCount, addGuitarssCount, addGuitarssShow, addPriceStart, addPriceEnd, addCurrentGuitar, addNewComment, toggleIsReviewOpen, toggleIsSuccessOpen, addCurrentComments, addProductsInCart, clearProductsInCart } from './redusers/data-reducer/data-reducer';
import { addCoupon, clearCart, clearCoupon, setFilter, setSort } from './redusers/client-reduser/client-reducer';
import axios from 'axios';

export const SUCCESS_MESSAGE = 'Order is successful';

export const fetchGuitarsSearch = (searchCriteria: string): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {

    try {
      const { data } = await api.get<GuitarsList>(`${APIRoute.Guitars}?name_like=${searchCriteria}`);
      if (getState().CLIENT.searchCriteria === '') {
        return;
      }
      dispatch(addGuitarssSearch(data));
    }

    catch {
      toast.error('Что-то пошло не так, попробуйте позже', {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.clearWaitingQueue();
    }
  };

export const fetchFilteredGuitars = (filter: FilterState, page: number, searchRequest?:boolean): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {

    const currentPage = searchRequest ? page : PAGINATION_DEFAULT_PAGE;
    const sort = getState().CLIENT.sort;
    const query = allRequest(currentPage, filter, sort);
    dispatch(toggleIsLoading(true));
    dispatch(clearGuitarssCount());

    try {
      const { data, headers } = await api.get<CompleteGuitar[]>(`${APIRoute.Guitars}${query}`);
      const productsTotalCount = headers[TOTAL_COUNT];
      if ((data.length === 0)&&(searchRequest)) {
        throw new Error('Произошла ошибка, попробуйте позже');
      }
      dispatch(addGuitarssCount(productsTotalCount));
      dispatch(addGuitarssShow(data));
      dispatch(setFilter(filter));
    }

    catch {
      toast.error('Что-то пошло не так, попробуйте позже', {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.clearWaitingQueue();
    }

    dispatch(toggleIsLoading(false));
  };

export const fetchSortedGuitars = (page: number, sort: SortState): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    dispatch(toggleIsLoading(true));
    const filter = getState().CLIENT.filter;
    const query = allRequest(page, filter, sort);

    try {
      const { data } = await api.get<CompleteGuitar[]>(`${APIRoute.Guitars}${query}`);
      dispatch(addGuitarssShow(data));
      dispatch(setSort(sort));
    }

    catch {
      toast.error('Что-то пошло не так, попробуйте позже', {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.clearWaitingQueue();
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
      toast.error('Что-то пошло не так, попробуйте позже', {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.clearWaitingQueue();
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
    } catch {
      toast.error('Что-то пошло не так, попробуйте позже', {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.clearWaitingQueue();
    }
    dispatch(toggleIsLoading(false));
  };


// CARD PADE

export const fetchCurrentGuitar = (id: string): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    try {
      const { data } = await api.get<CompleteGuitar>(`${(AppRoute.CardPage).replace(':id', id)}?_embed=comments`);
      const {comments, ...rest} = data;
      dispatch(addCurrentGuitar(rest));
      dispatch(addCurrentComments(comments));
    } catch {
      toast.error('Что-то пошло не так, попробуйте позже', {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.clearWaitingQueue();
    }
  };

export const postComment = (comment: CommentPost): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    try {
      const { data } = await api.post<Comment>(`${APIRoute.Comments}`, comment);
      dispatch(addNewComment(data));
      dispatch(toggleIsReviewOpen(false));
      dispatch(toggleIsSuccessOpen(true));
    } catch {
      toast.error('Что-то пошло не так, попробуйте позже', {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.clearWaitingQueue();
    }
  };

export const fetchCartProducts =
    (productsIDs: string[]): ThunkActionResult =>
      async (dispatch, _getState, api): Promise<void> => {
        dispatch(toggleIsLoading(true));
        try {
          const response = await
          axios.all(productsIDs.map((id) => api.get<CompleteGuitar>(`${APIRoute.Guitars}/${id}`)));
          const products = response.map((resp) => resp.data);
          dispatch(addProductsInCart(products));
        } catch {
          toast.error('Что-то пошло не так, попробуйте позже', {
            position: toast.POSITION.TOP_CENTER,
          });
          toast.clearWaitingQueue();
        }
        dispatch(toggleIsLoading(false));
      };

export const requestCoupon =
    (value: string): ThunkActionResult =>
      async (dispatch, _getState, api): Promise<void> => {
        try {
          const { data } = await api.post<number>(`${APIRoute.Coupons}`, {coupon: value});
          dispatch(addCoupon({value, sale: data}));
        } catch {
          dispatch(addCoupon(CouponError));
          toast.error('Ваш промокод не принят, проверьте правильность или попробуйте позднее', {
            position: toast.POSITION.TOP_CENTER,
          });
          toast.clearWaitingQueue();
        }
      };

export const requestOrder =
      (order: Order): ThunkActionResult =>
        async (dispatch, getState, api): Promise<void> => {
          try {
            await api.post<number>(`${APIRoute.Orders}`, order);
            dispatch(clearProductsInCart());
            dispatch(clearCoupon());
            dispatch(clearCart());
            toast.success(SUCCESS_MESSAGE);
          } catch {
            toast.error('Что-то пошло не так, попробуйте позже', {
              position: toast.POSITION.TOP_CENTER,
            });
            toast.clearWaitingQueue();
          }
        };
