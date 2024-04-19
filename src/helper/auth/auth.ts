import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { removeTokens } from '../../redux/ducks/token';

export const logOutHandler = (dispatch: Dispatch<AnyAction>) => {
  dispatch(removeTokens());
};