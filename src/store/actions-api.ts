import { ThunkActionResult } from '../types/actions';
import { APIRoute } from '../const';
import { GuitarsList } from '../types/guitar';
import { setFillingGuitarsList, loadGuitarsRequest, loadGuitarsSuccess } from './action';


export const fetchGuitarsAction = (sort = {}): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadGuitarsRequest());
    const {data} = await api.get(APIRoute.Guitars, {params: sort});
    dispatch(loadGuitarsSuccess(data));
  }
);

export const fetchGuitarsList = ():ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<GuitarsList>(APIRoute.Guitars);
    dispatch(setFillingGuitarsList(data));
  };
