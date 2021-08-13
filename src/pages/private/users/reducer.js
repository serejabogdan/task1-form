export const TYPE = (function (prefix) {
  return {
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
    INITIALIZE: `${prefix}INITIALIZE`,
    USER_CHECKED: `${prefix}USER_CHECKED`,
    USERS_CHECKED: `${prefix}USERS_CHECKED`,
    UPDATE_FILTERS: `${prefix}UPDATE_FILTERS`,
  };
})('@users/');

const initial = {
  page: 0,
  size: 10,
  name: '',
  search: '',
  disabled: false,
  errorMessage: '',
  initialized: false,
  hasCheckedUsers: [],
  hasOpenedDropdown: false,
  hasAllUsersChecked: false,
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
    case TYPE.USER_CHECKED: return {
      ...state,
      data: {
        ...state.data,
        content: state.data.content.map(user => {
          if (user.id === payload) {
            return ({ ...user, checked: !user.checked });
          }
          return user;
        })
      }
    };
    case TYPE.USERS_CHECKED: return {
      ...state,
      data: {
        ...state.data,
        content: state.data.content.map(user => {
          return ({ ...user, checked: state.hasAllUsersChecked });
        })
      }
    };
    default: return state;
  }
}

export function selector (state) {
  return state.root.pages.private.users;
}
