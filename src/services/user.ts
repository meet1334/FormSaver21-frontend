import { axiosDelete, axiosGet, axiosPatch,axiosPost } from '../axios/config';

const prefix = `/api/user`;

export const createUser = (data:object)=>{
    return axiosPost(`${prefix}/`,data);
}

export const getAllUsers = () => {
  return axiosGet(`${prefix}/`);
};

export const getAllUsersOption = () => {
  return axiosGet(`${prefix}/options`);
};

export const getUser = (id: string | number) => {
  return axiosGet(`${prefix}/id/${id}`);
};

export const updateUser = (data: object, id: string | number) => {
  return axiosPatch(`${prefix}/id/${id}`, data);
};
export const deleteUser = (id: string | number) => {
  return axiosDelete(`${prefix}/id/${id}`);
};
