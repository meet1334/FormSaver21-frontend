import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { generalContext } from '../../app/App';
import { tokensSelector } from '../../redux/ducks/token';

const AuthGuard = ({
  props,
  children,
  modulename,
}: {
  path?: string;
  props: any;
  children: JSX.Element;
  modulename: string[];
}) => {
  const { userLevel } = useContext(generalContext);
  const byPass = process.env.NX_APP_PERMISSION_BYPASS === 'false' ? false : true;
  const roleRoute = true;

  // if(userLevel){

  // }

  const tokens = useSelector(tokensSelector);

  if (tokens.accessToken) {
    if (roleRoute || byPass) {
      return children;
    } else {
      return <Navigate to={'/404'} replace={true} />;
    }
  } else {
    return <Navigate to={'/auth/login'} replace={true} />;
  }
};

export default AuthGuard;
