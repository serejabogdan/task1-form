import { combineReducers } from 'redux';

import publicReducer from './public/reducer';
import privateReducer from './private/reducer';

export const PAGES_META = 'PAGES_META';
export const APP_INITIALIZING = 'APP_INITIALIZING';

const initialState = {
  user: '',
  accessToken: localStorage.getItem('token') || '',
  initialized: false,
  errorMessage: '',
  disabled: false,
};

function pagesReducer (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PAGES_META: return { ...state, ...payload };
    default:
      return state;
  }
}

export function getAccessToken () {
  return state => state.root.pagesData.accessToken;
}

export function getPagesData () {
  return state => state.root.pagesData;
}

const pages = combineReducers({
  public: publicReducer,
  private: privateReducer
});

export default combineReducers({
  pagesData: pagesReducer,
  pages
});
