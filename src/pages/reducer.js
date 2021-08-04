import publicReducer from './public/reducer';
import privateReducer from './private/reducer';
import { combineReducers } from 'redux';

export const SET_USER = 'SET_USER';
export const ASYNC_SET_USER = 'ASYNC_SET_USER';
export const SET_INITIALIZED = 'SET_INITIALIZED';
export const APP_INITIALIZING = 'APP_INITIALIZING';
export const SET_DISABLED = 'SET_DISABLED';

const initialState = {
  initialized: false,
  errorMessage: 'Something wrong',
  disabled: false,
  user: ''
};

function pagesReducer (state = initialState, action) {
  switch (action.type) {
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

export function setUser (data) {
  return {
    type: SET_USER,
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

export default combineReducers({
  pagesInitialize: pagesReducer,
  pages
});
