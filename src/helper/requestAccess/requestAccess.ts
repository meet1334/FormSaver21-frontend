import { jwtDecode } from 'jwt-decode';

export function getAccessRequest(url: string) {
  const decrptyToken: {
    [key: string]: any;
    AccessApi: [];
    UserLevel: string;
  } = jwtDecode(url);

  return decrptyToken;
}
