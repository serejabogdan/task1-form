export const TYPE = (function (prefix) {
  return {
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
    INITIALIZE: `${prefix}INITIALIZE`
  };
})('@user-create/');

const initial = {
  disabled: false,
  errorMessage: '',
  initialized: false,
};

export default function userCreateReducer (state = initial, { type, payload }) {
  switch (type) {
    case TYPE.META : return { ...state, ...payload };
    case TYPE.CLEAR : return { ...state, initialized: true };
    default: return state;
  }
}

export function selector (state) {
  return state.root.pages.private.userCreate;
}
