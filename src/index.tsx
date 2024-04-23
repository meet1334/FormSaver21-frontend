import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './app/App';
import setupAxios from './axios/config';
import SiteTrouble from './components/SiteTrouble/SiteTrouble';
import { persistor, store } from './redux/Store';

setupAxios(store);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ErrorBoundary fallback={<SiteTrouble />}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
);
