import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
};
export interface AccessToken {
  jwt: string;
}
export interface ItokenInitialRedux {
  accessToken: null | AccessToken;
}

export const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state: ItokenInitialRedux, action: PayloadAction<ItokenInitialRedux>) => {
      state.accessToken = action.payload.accessToken;
    },
    removeTokens: (state: ItokenInitialRedux) => {
      state.accessToken = null;
    },
  },
});

export const tokensSelector = (state: { tokens: ItokenInitialRedux }) => state.tokens;

const { actions, reducer } = tokenSlice;

export const { setTokens, removeTokens } = actions;

export default reducer;
