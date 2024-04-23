import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
export interface INavOptions {
  title: string;
  value: string;
  link: string;
  iconDetails: {
    icon: string;
    props: any;
    hoverOrSelectedIcon?: string;
  };
  isSubNavigationOpen?: boolean;
  subNavigationOptions?:
    | {
        title: string;
        value: string;
        link: string;
        status: string;
        moduleName: string[];
      }[]
    | [];
  count?: number;
  moduleName: string[];
  isAllow: boolean;
}


export interface ISidebar {
    parentClass?: string;
    activeTab?: string | null;
    options: Array<INavOptions>;
    logOffHandler?: () => void;
    processLogOff?: boolean;
  }
