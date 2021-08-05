export const PRIVATE_SAGA_VALID_TOKEN = 'PRIVATE_SAGA_VALID_TOKEN';

export const PRIVATE_META = 'PRIVATE_META';

const initialState = {
  initialized: false,
  errorMessage: '',
  disabled: false,
};

export default function privateReducer (state= initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PRIVATE_META: return { ...state, ...payload };
    default: return state;
  }
}

export function getPrivateState() {
  return state => state.root.pages.private;
}