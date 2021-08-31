export const TYPE = (function (prefix) {
  return {
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
    SORT_BY: `${prefix}SORT_BY`,
    INITIALIZE: `${prefix}INITIALIZE`,
    SELECTED_USER: `${prefix}SELECTED_USER`,
    SELECTED_USERS: `${prefix}SELECTED_USERS`,
    UPDATE_FILTERS: `${prefix}UPDATE_FILTERS`,
  };
})('@users/');

const initial = {
  disabled: false,
  errorMessage: '',
  initialized: false,

  page: 0,
  size: 10,
  name: '',
  role: '',
  sort: 'name,ASC',
  selectedUsers: [],
  sortDirection: true,
  currentSortField: 'name',
  sortDirectionBoolean: true,

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
