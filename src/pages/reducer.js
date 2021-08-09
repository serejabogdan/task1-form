// outsource dependencies
import { combineReducers } from 'redux';

// local dependencies
import publicReducer from './public/reducer';
import privateReducer from './private/reducer';
import { TOKEN } from '../constants/local-storage';
import { getLocalStorage } from '../utils/local-storage';

export const TYPE = (function (prefix) {
  return {
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
    INITIALIZE: `${prefix}INITIALIZE`,
    UPDATE_TOKEN: `${prefix}UPDATE_TOKEN`,
    CHECK_ACCESS_TOKEN: `${prefix}CHECK_ACCESS_TOKEN`,
    STOP_REFRESHING_TOKEN: `${prefix}STOP_REFRESHING_TOKEN`,
    AUTH: `${prefix}AUTH`
  };
})('@pages/');

const initial = {
  auth: false,
  user: '',
  token: getLocalStorage(TOKEN) || '',
  initialized: false,
  errorMessage: '',
  disabled: false,
};

function pagesReducer (state = initial, action) {
  const { type, payload } = action;
  switch (type) {
    case TYPE.META: return { ...state, ...payload };
    case TYPE.CLEAR: return { ...initial, initialized: true };
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
