import React, { Suspense, useContext, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import RouteComponent from '../../routes/route';
import GlobalLoader from '../../components/GlobalLoader/GlobalLoader';
// import { INavOptions } from '@radefy/component/types/Sidebar/sidebar';
import { navigationOptions } from '../../utils/navigation.utils';
import { removeTokens, tokensSelector } from '../../redux/ducks/token';
// import { logOff } from '../../services/auth';
import { generalContext } from '../../app/App';
import { INavOptions } from '../../types/Sidebar/Sidebar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { ToastShow } from '../../redux/ducks/toast';
// import { adminPermissions, rolePermissionConstant } from '../../utils/constants/constants.utils';
// import { adminAccessPermission } from '@radefy-common/utils/helper/requestAccess/requestAccess';

const Layout = (props: PropsFromRedux) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLevel, resetPermisiion } = useContext(generalContext);
  const tokens = useSelector(tokensSelector);
  const [processLogOff, setProcessLogoff] = useState(false);
  const [selectedNavigationTab, setSelectedNavigationTab] = useState<string | null>(null);
  const [tabOption, setTabOption] = useState<INavOptions[]>([]);
  const tabOptionRef = useRef<INavOptions[]>([]);

  useEffect(() => {
    if (!props.tokens.accessToken) {
      navigate('/auth/login', { replace: true });
    } else {
      // show dashboard active (exceptional conditions)
      const path = location.pathname === '/' ? 'dashboard' : location.pathname;
      setSelectedNavigationTab(path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    setTabOption(navigationOptions);
  }, [navigationOptions]);
  const logOffHandler = async () => {
    setProcessLogoff(true);
    try {
      dispatch(
        ToastShow({
          message: 'User Logout Successfully',
          type: 'success',
        })
      );
      //   const logoffBodyData = {
      //     tokenValue: tokens.refreshToken?.token,
      //     tokenId: tokens.refreshToken?.tokenId,
      //   };
      //   const logoffResponse = await logOff(logoffBodyData);
      //   if (logoffResponse.status === 200) {
      setProcessLogoff(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('jwttoken', '');
      }
      dispatch(removeTokens());
      resetPermisiion && resetPermisiion();
      navigate('/auth/login');
      //   } else {
      //     setProcessLogoff(false);
      //     if (typeof window !== 'undefined') {
      //       localStorage.setItem('jwttoken', '');
      //     }
      //     dispatch(removeTokens());
      //   }
    } catch (error) {
      setProcessLogoff(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('jwttoken', '');
      }
      dispatch(removeTokens());
    }
  };

  return (
    <div className="flex flex-wrap p-4">
      <Sidebar
        options={tabOption}
        activeTab={selectedNavigationTab}
        logOffHandler={logOffHandler}
        processLogOff={processLogOff}
      />
      <Suspense fallback={<GlobalLoader />}>
        <Outlet />
        <div className="content-right max-w-[calc(100%_-_256px)] w-full pl-15px pr-15px">
          <div className="content-right-inner h-[calc(100%_-_5px)]">
            <RouteComponent />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  tokens: tokensSelector,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Layout);
