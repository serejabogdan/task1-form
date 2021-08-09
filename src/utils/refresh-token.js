// outsource dependencies
import axios from 'axios';

// local dependencies
import { privateAPI as request, publicAPI } from './API';
import { getLocalStorage, setLocalStorage } from './local-storage';
import { TOKEN } from '../constants/local-storage';

request.interceptors.request.use(
  (config) => {
    const { accessToken } = getLocalStorage(TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let loop = 0;
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

request.interceptors.response.use(null, (err) => {
  const {
    config,
    response: { status },
  } = err;

  if (status === 401 && loop < 1) {
    loop++;
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

export default request;
