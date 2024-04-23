import React from 'react';
// import Communication from '../pages/communication/Communication';
// import ActivityDetail from '../pages/digitalMarketPlace/ActivityDetail';
// import DigitalMarketPlace from '../pages/digitalMarketPlace/DigitalMarketPlace';

const SiteTrouble = React.lazy(() => import('../components/SiteTrouble/SiteTrouble'));
const CreateAdminStaff = React.lazy(() => import('../pages/AdminStaff/CreateAdminStaff'));
const CreateUsers = React.lazy(() => import('../pages/Users/CreateUsers'));
const AdminStaffList = React.lazy(() => import('../pages/AdminStaff/AdminStaffList'));
const UserList = React.lazy(() => import('../pages/Users/UserLists'));

const routes = [
  //for profile tab
  //   {
  //     path: '/user-profile',
  //     name: 'User Profile',
  //     component: <SiteTrouble />,
  //     moduleName: [],
  //   },
  {
    path: '/user-profile',
    name: 'User Profile',
    component: <CreateAdminStaff />,
    moduleName: [],
  }, {
    path: '/admin-staff',
    name: 'Admin Staff',
    component: <AdminStaffList />,
    moduleName: [],
  },
  // {
  //   path: '/adminstaff/create',
  //   name: 'Admin Staff Create',
  //   component: <CreateAdminStaff />,
  //   moduleName: [],
  // },
  //   {
  //     path: '/adminstaff/:slug',
  //     name: 'Admin Staff Profile',
  //     component: <SiteTrouble />,
  //     moduleName: [],
  //   },
  {
    path: '/users',
    name: 'User',
    component: <UserList />,
    moduleName: [],
  },
  //   {
  //     path: '/user/:slug',
  //     name: 'User Profile',
  //     component: <SiteTrouble />,
  //     moduleName: [],
  //   },
  {
    path: '*',
    component: <SiteTrouble />,
    moduleName: [],
  },
];

export default routes;
