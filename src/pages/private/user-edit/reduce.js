export const TYPE = (function (prefix) {
  return {
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
  };
})('@user-edit/');

const initial = {
  disabled: false,
  errorMessage: '',
  initialized: false,
};

export default function userEditReducer (state = initial, action) {
  return state;
}

export function selector (state) {
  return state.root.pages.private.userEdit;
}
