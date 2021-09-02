// outsource dependencies
import { call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';
import { selector } from '../../reducer';
import { privateAPI } from '../../../utils/API';

function createUser (user) {
  return privateAPI({
    method: 'POST',
    url: 'admin-service/users',
    data: user
  });
}

function * handleCreateUser ({ payload }) {
  const { roles } = yield select(selector);
  try {
    const validRoles = yield payload.roles.map(role => {
      const foundRole = roles.find(({ name }) => role.value === name);
      return { id: foundRole.id };
    });
    const suffix = yield payload.suffix.value;
    yield call(createUser, { ...payload, roles: validRoles, suffix });
  } catch (error) {
    yield put({ type: TYPE.META, payload: { errorMessage: error.message } });
  }
}

function * initialSaga () {
  yield put({ type: TYPE.META, payload: { initialize: true } });
}

function * userCreateWatcher () {
  yield takeEvery(TYPE.INITIALIZE, initialSaga);
  yield takeLatest(TYPE.CREATE_USER, handleCreateUser);
}

export default function * userCreateSaga () {
  yield fork(userCreateWatcher);
}
