import axios from 'axios';

const URL = 'https://healthene-gateway-dev.intelliceed.cf/api';

export const publicAPI = axios.create({
  baseURL: URL,
  withCredentials: false,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  }
});

export const privateAPI = axios.create({
  baseURL: URL,
  withCredentials: false,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  }
});

export function getUserData () {
  return privateAPI({
    method: 'GET',
    url: 'auth/users/me',
  });
}

export function addAuthorizationHeader (token) {
  privateAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
}
