import { axiosDelete, axiosGet, axiosPatch } from '../axios/config';

const prefix = `/api/adminuser`;

export const getAllAdminUsers = () => {
  return axiosGet(`${prefix}/`);
};

export const getAllAdminUsersOption = () => {
  return axiosGet(`${prefix}/options`);
};

export const getAdminUser = (id: string | number) => {
  return axiosGet(`${prefix}/id/${id}`);
};

export const updateAdminUser = (data: object, id: string | number) => {
  return axiosPatch(`${prefix}/id/${id}`, data);
};
export const deleteAdminUser = (id: string | number) => {
  return axiosDelete(`${prefix}/id/${id}`);
};
