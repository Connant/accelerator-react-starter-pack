import { createReducer } from '@reduxjs/toolkit';
import { GuitarsList } from '../../types/guitar';
import { loadSearchResults } from '../action';

type TSearchResults = {
  guitars: GuitarsList,
};

const initialState: TSearchResults = {
  guitars: [],
};

const searchReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadSearchResults, (state, action) => {
    const { guitars } = action.payload;
    state.guitars = guitars;
  });
});

export { searchReducer };
