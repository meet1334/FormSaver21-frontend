import { axiosPost } from '../axios/config';

const prefix = `/api/auth`;

export const login = (data: object) => {
  return axiosPost(`${prefix}/login`, data);
};

export const signUp = (data:object)=>{
    return axiosPost(`${prefix}/sign`,data);
}