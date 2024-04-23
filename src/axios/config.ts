import axios from 'axios';
import { Store } from 'redux';
import { ItokenInitialRedux, removeTokens, setTokens } from '../redux/ducks/token';

const setupAxios = (store: Store) => {
  axios.interceptors.request.use((request: any) => {
    const storeData = store.getState();
    const tokens: ItokenInitialRedux = storeData.tokens;
    if (tokens.accessToken) {
      request.headers.Authorization = `Bearer ${tokens.accessToken.jwt}`;
    }
    return request;
  });
  axios.interceptors.response.use(
    async (res) => {
      return res;    
    },
    async (e) => {
      const storeData = store.getState();
      const tokens: ItokenInitialRedux = storeData.tokens;  
      //   if (tokens.refreshToken !== null) {
      // if (e.response.status === 401) {
      //   const originalRequest = e.config;
      //   originalRequest._retry = true;
      //   const now = new Date();
      //   const isoDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
      // //   if (isoDate <= new Date(tokens.refreshToken.expires.dateTimeUTC)) {
      //     try {
      //     //   const responseFromGenerateAccessToken = await axios.post(
      //     //     `${process.env.NX_APP_API_URL}/api/radefy-admin/account/refresh-token`,
      //     //     {
      //     //       tokenValue: tokens.refreshToken.token,
      //     //       tokenId: tokens.refreshToken.tokenId,
      //     //     }
      //     //   );
      //       if (responseFromGenerateAccessToken.status === 200) {
      //         originalRequest.headers.Authorization = `Bearer ${responseFromGenerateAccessToken.data.accessToken}`;
      //         store.dispatch(
      //           setTokens({
      //             accessToken: responseFromGenerateAccessToken.data.accessToken,
      //             refreshToken: responseFromGenerateAccessToken.data.refreshToken,
      //           })
      //         );
      //         return axios(originalRequest);
      //       } else {
      //         if (typeof window !== 'undefined') {
      //           localStorage.setItem('chattoken', '');
      //           localStorage.setItem('chattokenExpire', '');
      //         }
      //         store.dispatch(removeTokens());
      //         window.location.replace(`${process.env.NX_APP_URL}/auth/login`);
      //       }
      //     } catch (error) {
      //       if (typeof window !== 'undefined') {
      //         localStorage.setItem('chattoken', '');
      //         localStorage.setItem('chattokenExpire', '');
      //       }
      //       store.dispatch(removeTokens());
      //       window.location.replace(`${process.env.NX_APP_URL}/auth/login`);
      //     }
      // //   }
      // //   else {
      // //     if (typeof window !== 'undefined') {
      // //       localStorage.setItem('chattoken', '');
      // //       localStorage.setItem('chattokenExpire', '');
      // //     }
      // //     store.dispatch(removeTokens());
      // //     window.location.replace(`${process.env.NX_APP_URL}/auth/login`);
      // //   }
      // }
      //   }
      return e.response;
    }
  );
};

export default setupAxios;

const fronturl = `https://form-saver21.vercel.app`;
// console.log(process.env.NX_APP_PORT, 'meet 786');

export function axiosGet<T>(url: string, data: T | null = null) {
  return axios.get(`${fronturl}${url}`, {
    params: data,
  });
}

export function axiosPost<T>(url: string, data: T | object) {
  return axios.post(`${fronturl}${url}`, data);
}

export const axiosConfig = (method: string, url: string, config: any, data: object) => {
  return axios({
    method: method,
    url: `${fronturl}${url}`,
    ...config,
    data,
  });
};

export const axiosPatch = (url: string, data: object) => {
  return axios.patch(`${fronturl}${url}`, data);
};

export const axiosPut = (url: string, data: object) => {
  return axios.put(`${fronturl}${url}`, data);
};

export const axiosDelete = (url: string) => {
  return axios.delete(`${fronturl}${url}`);
};
