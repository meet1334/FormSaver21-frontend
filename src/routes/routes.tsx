import React from 'react';
// import Communication from '../pages/communication/Communication';
// import ActivityDetail from '../pages/digitalMarketPlace/ActivityDetail';
// import DigitalMarketPlace from '../pages/digitalMarketPlace/DigitalMarketPlace';

const SiteTrouble = React.lazy(() => import('../components/SiteTrouble/SiteTrouble'));
const AdminProfile = React.lazy(() => import('../pages/AdminStaff/AdminProfile'));
const AdminStaff = React.lazy(() => import('../pages/AdminStaff/AdminStaff'));
const CreateAdminStaff = React.lazy(() => import('../pages/AdminStaff/CreateAdminStaff'));
const Users = React.lazy(() => import('../pages/Users/Users'));
const CreateUsers = React.lazy(() => import('../pages/Users/CreateUsers'));

const routes = [
  // Admin Profile routes =================
  {
    path: '/user-profile',
    name: 'User Profile',
    component: <AdminProfile />,
    moduleName: [],
  },
  // Admin staff routes =================
  {
    path: '/admin-staff',
    name: 'Admin Staff',
    component: <AdminStaff />,
    moduleName: [],
  },
  {
    path: '/admin-staff/:operation',
    name: 'Create Admin Staff ',
    component: <CreateAdminStaff />,
    moduleName: [],
  },

  // User routes =================
  {
    path: '/users',
    name: 'Users',
    component: <Users />,
    moduleName: [],
  },
  {
    path: '/users/:operation',
    name: 'Create Users ',
    component: <CreateUsers />,
    moduleName: [],
  },
  {
    path: '*',
    component: <SiteTrouble />,
    moduleName: [],
  },
];

export default routes;
