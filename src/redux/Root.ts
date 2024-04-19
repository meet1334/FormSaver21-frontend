import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import Cookies from 'cookies-js';
import tokenReducer from './ducks/token';
import toastReducer from './ducks/toast';
const { CookieStorage } = require('redux-persist-cookie-storage');

const persistConfig = {
  key: 'formsaver21',
  storage: new CookieStorage(Cookies, {
    expiration: {
      default: 365 * 86400, // Cookies expire after one year
    },
  }),
  whitelist: ['tokens', 'toast'],
};

const rootReducer = combineReducers({
  tokens: tokenReducer,
  toast: toastReducer,
});

export default persistReducer(persistConfig, rootReducer);
