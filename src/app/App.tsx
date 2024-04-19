import { createContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { AccessToken, tokensSelector } from '../redux/ducks/token';
import { getAccessRequest } from '../helper/requestAccess/requestAccess';
import GlobalLoader from '../components/GlobalLoader/GlobalLoader';
import ToastNotification from '../components/ToastNotification/ToastNotification';

export interface IAppProps {
  tokens: {
    accessToken: AccessToken | null;
  };
}

export const generalContext = createContext<{
  userLevel: string;
}>({
  userLevel: '',
});

const UnauthorizedComponent = ({
  children,
  props,
}: {
  children: JSX.Element;
  props: IAppProps;
}) => {
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    if (typeof window === 'object') {
      setReadyToRender(true);
    } else {
      setReadyToRender(false);
    }
  }, []);

  return !props.tokens.accessToken ? (
    children
  ) : readyToRender ? (
    <Navigate to={'/user-profile'} />
  ) : null;
};

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokens = useSelector(tokensSelector);
  const [readyToRender, setReadyToRender] = useState(false);
  const [userLevel, setUserLevel] = useState<string>('');
  let authToken: string | null = null;
  if (typeof window !== 'undefined') {
    authToken = localStorage.getItem('authToken');
  }

  useEffect(() => {
    (async () => {
      if (tokens.accessToken?.jwt) {
        const requestAccess = getAccessRequest(tokens.accessToken?.jwt);

        if (requestAccess?.AccessApi) {
          setUserLevel(requestAccess?.UserLevel);
        }
      }
    })();
  }, [tokens.accessToken?.jwt]);

  useEffect(() => {
    if (readyToRender === false) {
      setReadyToRender(true);
    }
  }, [readyToRender]);
  return readyToRender === true ? (
    <generalContext.Provider
      value={{
        userLevel: userLevel,
      }}
    >
      <ToastNotification />
      {/* <Routes>
        <Route
          path="/auth/login"
          element={
            <UnauthorizedComponent props={{ tokens }}>
              <Login />
            </UnauthorizedComponent>
          }
        />
        <Route
          path="/reset-password/:slug"
          element={
            <UnauthorizedComponent props={{ tokens }}>
              <ResetPassword />
            </UnauthorizedComponent>
          }
        />
        <Route path="/reset-link" element={<ResetLink />} />
        <Route path="*" element={<Layout />} />
      </Routes> */}
    </generalContext.Provider>
  ) : (
    <GlobalLoader />
  );
};

export default App;