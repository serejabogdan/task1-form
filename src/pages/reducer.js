import { combineReducers } from 'redux';

import publicReducer from './public/reducer';
import privateReducer from './private/reducer';

export const SET_USER = 'SET_USER';
export const SET_DISABLED = 'SET_DISABLED';
export const ASYNC_SET_USER = 'ASYNC_SET_USER';
export const SET_INITIALIZED = 'SET_INITIALIZED';
export const APP_INITIALIZING = 'APP_INITIALIZING';
export const PAGES_META = 'PAGES_META';

const initialState = {
  initialized: false,
  errorMessage: '',
  disabled: false,
  user: '',
  accessToken: localStorage.getItem('token') || '',
};

function pagesReducer (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PAGES_META: return { ...state, ...payload };
    case SET_INITIALIZED:
      return { ...state, initialized: action.payload };
    case SET_DISABLED:
      return { ...state, disabled: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function asyncSetUser (data) {
  return {
    type: ASYNC_SET_USER,
    payload: data
  };
}

export function setInitialized (flag) {
  return {
    type: SET_INITIALIZED,
    payload: flag
  };
}

export function setDisabled (flag) {
  return {
    type: SET_DISABLED,
    payload: flag
  };
}
export function appInitializing (data) {
  return {
    type: APP_INITIALIZING,
    payload: data
  };
}

const pages = combineReducers({
  public: publicReducer,
  private: privateReducer
});

export function getAccessToken () {
  return state => state.root.pagesData.accessToken;
}

export function getPagesData () {
  return state => state.root.pagesData;
}

export default combineReducers({
  pagesData: pagesReducer,
  pages
});
