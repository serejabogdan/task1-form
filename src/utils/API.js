// outsource dependencies
import axios from 'axios';

// local dependencies
import { TOKEN } from '../constants/local-storage';
import { getLocalStorage, setLocalStorage } from './local-storage';

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

privateAPI.interceptors.request.use(
  (config) => {
    const { accessToken } = getLocalStorage(TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let subscribers = [];

function subscribeTokenRefresh (cb) {
  subscribers.push(cb);
}

function onRefreshed (token) {
  subscribers.map((cb) => cb(token));
}

function updateTokenApi (token) {
  return publicAPI({
    method: 'POST',
    url: 'auth/token/refresh',
    data: token
  });
}

privateAPI.interceptors.response.use(null, (err) => {
  const {
    config,
    response: { status },
  } = err;

  if (status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      const { refreshToken } = getLocalStorage(TOKEN);
      updateTokenApi({ refreshToken }).then((response) => {
        const { data } = response;
        isRefreshing = false;
        onRefreshed(data.accessToken);
        setLocalStorage(TOKEN, data);
        subscribers = [];
      });
    }

    return new Promise((resolve) => {
      subscribeTokenRefresh((token) => {
        config.headers.Authorization = `Bearer ${token}`;
        resolve(axios(config));
      });
    });
  }
  return Promise.reject(err);
});
