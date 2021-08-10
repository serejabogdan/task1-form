import { getLocalStorage } from '../../../utils/local-storage';
import { CURRENT_PAGE, USERS_NUMBER } from '../../../constants/local-storage';

export const TYPE = (function (prefix) {
  return {
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    DROPDOWN_META: `${prefix}DROPDOWN_META`,
    PAGINATION_META: `${prefix}PAGINATION_META`,
    // complex actions
    LOGOUT: `${prefix}LOGOUT`,
    GET_USERS: `${prefix}GET_USERS`,
    VALID_TOKEN: `${prefix}VALID_TOKEN`,
    CHANGE_CURRENT_PAGE: `${prefix}CHANGE_CURRENT_PAGE`
  };
})('@users/');

const initial = {
  initialized: false,
  errorMessage: '',
  disabled: false,
  data: '',
  usersChecked: false,
  pagination: {
    currentPage: getLocalStorage(CURRENT_PAGE) || 0
  },
  dropdown: {
    isOpen: false,
    numberOfUsers: getLocalStorage(USERS_NUMBER) || 10
  }
};

export default function usersReducer (state= initial, action) {
  const { type, payload } = action;
  switch (type) {
    case TYPE.META: return { ...state, ...payload };
    case TYPE.PAGINATION_META: return { ...state, pagination: { ...state.pagination, ...payload } };
    case TYPE.DROPDOWN_META: return { ...state, dropdown: { ...state.dropdown, ...payload } };
    case TYPE.CLEAR: return initial;
    default: return state;
  }
}

export function selector (state) {
  return state.root.pages.private.users;
}
