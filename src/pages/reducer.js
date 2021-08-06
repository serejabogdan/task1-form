// outsource dependencies
import { combineReducers } from 'redux';

// local dependencies
import publicReducer from './public/reducer';
import privateReducer from './private/reducer';
import { TOKEN } from '../constants/local-storage';
import { getLocalStorage } from '../utils/local-storage';

export const PAGES_META = 'PAGES_META';
export const PAGES_CLEAR = 'PAGES_CLEAR';
export const APP_INITIALIZING = 'APP_INITIALIZING';
export const UPDATE_TOKEN_SAGA = 'UPDATE_TOKEN_SAGA';
export const CHECK_ACCESS_TOKEN_SAGA = 'CHECK_ACCESS_TOKEN_SAGA';

const initial = {
  user: '',
  token: getLocalStorage(TOKEN) || '',
  initialized: false,
  errorMessage: '',
  disabled: false,
};

function pagesReducer (state = initial, action) {
  const { type, payload } = action;
  switch (type) {
    case PAGES_META: return { ...state, ...payload };
    case PAGES_CLEAR: return {
      user: '',
      token: getLocalStorage(TOKEN) || '',
      initialized: false,
      errorMessage: '',
      disabled: false,
    };
    default:
      return state;
  }
}

export function selector (state) {
  return state.root.pagesData;
}

const pages = combineReducers({
  public: publicReducer,
  private: privateReducer
});

export default combineReducers({
  pagesData: pagesReducer,
  pages
});
