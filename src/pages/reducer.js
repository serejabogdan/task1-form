// outsource dependencies
import { combineReducers } from 'redux';

// local dependencies
import publicReducer from './public/reducer';
import privateReducer from './private/reducer';

export const PAGES_META = 'PAGES_META';
export const APP_INITIALIZING = 'APP_INITIALIZING';

const initial = {
  user: '',
  token: localStorage.getItem('token') || '',
  initialized: false,
  errorMessage: '',
  disabled: false,
};

function pagesReducer (state = initial, action) {
  const { type, payload } = action;
  switch (type) {
    case PAGES_META: return { ...state, ...payload };
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
