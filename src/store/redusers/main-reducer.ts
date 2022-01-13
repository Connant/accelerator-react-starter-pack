import { createReducer } from '@reduxjs/toolkit';
import { StatusLoading } from '../../const';
import { GuitarType } from '../../types/guitar';
import { getGuitarStrings } from '../../utils';
import { loadGuitarsRequest, loadGuitarsSuccess } from '../action';

export type DataType = {
  guitarsList: GuitarType[],
  guitarsPriceMin: string,
  guitarsPriceMax: string,
  guitarTypeListWithStrings: {[key: string]: number[]} | null,
  guitarsLoading: StatusLoading,
  guitarsLoadingError: string | null,
  searchGuitars: GuitarType[],
  searchGuitarsLoading: StatusLoading,
  searchGuitarsLoadingError: string | null,
};

const initialState: DataType = {
  guitarsList: [],
  guitarsPriceMin: '',
  guitarsPriceMax: '',
  guitarTypeListWithStrings: null,
  guitarsLoading: StatusLoading.Idle,
  guitarsLoadingError: null,
  searchGuitars: [],
  searchGuitarsLoading: StatusLoading.Idle,
  searchGuitarsLoadingError: null,
};


const mainReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(loadGuitarsRequest, (state) => {
      state.guitarsLoading = StatusLoading.Loading;
    })

    .addCase(loadGuitarsSuccess, (state, action) => {
      const { guitars } = action.payload;
      if (state.guitarsPriceMin === '') {
        const priceMinData = Math.min(...Object.values(guitars)
          .map((elem) => elem.price));
        const priceMaxData = Math.max(...Object.values(guitars)
          .map((elem) => elem.price));
        state.guitarsPriceMin = String(priceMinData);
        state.guitarsPriceMax = String(priceMaxData);
        state.guitarTypeListWithStrings = getGuitarStrings(guitars);
      }
      state.guitarsList = guitars;
      state.guitarsLoading = StatusLoading.Succeeded;
    });

});

export { mainReducer };
