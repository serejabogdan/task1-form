import axios from 'axios';

const URL = 'https://healthene-gateway-dev.intelliceed.cf/api';

export const API = axios.create({
  baseURL: URL,
  withCredentials: false,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  }
});

export function getDataFromApi (payload) {
  return API({
    method: 'POST',
    url: 'auth/token',
    data: { ...payload }
  });
}

export function getUserData (token) {
  return API({
    method: 'GET',
    url: 'auth/users/me',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
