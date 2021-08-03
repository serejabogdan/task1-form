import publicReducers from './public/reducer';
import { combineReducers } from 'redux';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';
export const ASYNC_SET_USER = 'ASYNC_SET_USER';
export const ASYNC_SET_TOKEN = 'ASYNC_SET_TOKEN';

const initialState = {
  accessToken: localStorage.getItem('token') || '',
  user: ''
};

function pagesReducer (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { token: action.payload };
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

export function asyncSetToken (data) {
  return {
    type: ASYNC_SET_TOKEN,
    payload: data
  };
}

export function setUser (data) {
  return {
    type: SET_USER,
    payload: data
  };
}

export function setToken (token) {
  return {
    type: SET_TOKEN,
    payload: token
  };
}

export default combineReducers({
  public: publicReducers,
  pages: pagesReducer
});
