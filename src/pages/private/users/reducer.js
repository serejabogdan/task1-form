export const TYPE = (function (prefix) {
  return {
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
    INITIALIZE: `${prefix}INITIALIZE`,
    USER_SELECTED: `${prefix}USER_SELECTED`,
    USERS_SELECTED: `${prefix}USERS_SELECTED`,
    UPDATE_FILTERS: `${prefix}UPDATE_FILTERS`,
  };
})('@users/');

const initial = {
  page: 0,
  size: 10,
  name: '',
  roles: [],
  disabled: false,
  errorMessage: '',
  sort: 'name,ASC',
  sortField: 'name',
  initialized: false,
  sortDirection: true,
  hasAllUsersChecked: false,
  sortDirectionBoolean: true,
  isActionsDropdownDisabled: true,
  data: {
    content: [],
    size: 0,
    offset: 0,
    totalPages: 0,
    pageNumbers: 0,
    totalElements: 0,
  },
};

export default function usersReducer (state= initial, action) {
  const { type, payload } = action;
  switch (type) {
    case TYPE.META: return { ...state, ...payload };
    case TYPE.CLEAR: return { ...initial, initialized: true };
    default: return state;
  }
}

export function selector (state) {
  return state.root.pages.private.users;
}
