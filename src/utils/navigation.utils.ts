import { INavOptions } from '../types/Sidebar/Sidebar';

export const navigationOptions: Array<INavOptions> = [
  {
    title: 'Profile',
    value: 'user-profile',
    count: 0,
    link: '/user-profile',
    moduleName: [],
    iconDetails: {
      icon: 'User',
      props: { className: 'w-full h-full' },
    },
    subNavigationOptions: [],
    isAllow: true,
  },
  {
    title: 'Staff',
    value: 'admin-staff',
    count: 0,
    link: '/admin-staff',
    moduleName: [],
    iconDetails: {
      icon: 'LockOff',
      props: { className: 'w-full h-full' },
    },
    subNavigationOptions: [],
    isAllow: true,
  },
  {
    title: 'Users',
    value: 'users',
    count: 0,
    link: '/users',
    moduleName: [],
    iconDetails: {
      icon: 'LockOff',
      props: { className: 'w-full h-full' },
    },
    subNavigationOptions: [],
    isAllow: true,
  },
];
