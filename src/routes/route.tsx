import routes from './routes';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from '../components/Guards/AuthGuard';

interface IRouteAttribute {
  path: string;
  component: JSX.Element;
  name?: string;
  moduleName: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRouteComponent {}

const RouteComponent = (props?: IRouteComponent) => {
  return (
    <Routes>
      {routes &&
        routes.map((route: IRouteAttribute, idx: number) => {
          return route.component ? (
            <Route
              key={idx}
              path={route.path}
              element={
                <AuthGuard props={props} modulename={route.moduleName}>
                  {route.component}
                </AuthGuard>
              }
            />
          ) : null;
        })}
    </Routes>
  );
};
export default RouteComponent;
