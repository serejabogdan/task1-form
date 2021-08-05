export const PRIVATE_META = 'PRIVATE_META';
export const PRIVATE_SAGA_VALID_TOKEN = 'PRIVATE_SAGA_VALID_TOKEN';

const initial = {
  initialized: false,
  errorMessage: '',
  disabled: false,
};

export default function privateReducer (state= initial, action) {
  const { type, payload } = action;
  switch (type) {
    case PRIVATE_META: return { ...state, ...payload };
    default: return state;
  }
}

export function selector (state) {
  return state.root.pages.private;
}
