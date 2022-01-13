import { ThunkActionResult } from '../types/actions';
import { APIRoute, requestParameters } from '../const';
import { loadGuitarsRequest, loadGuitarsSuccess, loadSearchResults } from './action';
import { GuitarType } from '../types/guitar';


export const fetchGuitarsAction = (sort = {}): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadGuitarsRequest());
    const {data} = await api.get(APIRoute.Guitars, {params: sort});
    dispatch(loadGuitarsSuccess(data));
  }
);

export const searchGuitarsWithParams =
  (searchParams: string): ThunkActionResult =>
    async ( dispatch, _getState, api): Promise<void> => {
      try {
        const { data } = await api.get<GuitarType[]>(`${APIRoute.Guitars}?${requestParameters.NameLike}=${searchParams}`);
        dispatch(loadSearchResults(data));
      } catch {
        const { data } = await api.get(APIRoute.Guitars);
        dispatch(loadGuitarsSuccess(data));
      }
    };

