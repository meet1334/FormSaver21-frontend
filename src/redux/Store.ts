import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Root';
import { Middleware } from 'redux';
// import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

const Middlewares: Middleware[] = [];

// if (process.env.NODE_ENV === 'development') {
//     Middlewares.push(logger as Middleware);
//   }

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(Middlewares),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
const exportStore = { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default exportStore;