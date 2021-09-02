// outsource dependencies
import { call, fork, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reduce';
import { privateAPI } from '../../../utils/API';

function getUser (userId) {
  return privateAPI({
    method: 'GET',
    url: `admin-service/users/${userId}`,
  });
}

function * initialSaga ({ payload }) {
  try {
    const { data } = yield call(getUser, payload.userId);
    const user = { ...data, roles: data.roles.map(role => ({ value: role.name, label: role.name })) };
    yield put({ type: TYPE.META, payload: { user } });
  } catch (error) {
    yield put({ type: TYPE.META, payload: { errorMessage: error.message } });
  }
  yield put({ type: TYPE.META, payload: { initialize: true } });
}

function * userEditWatcher () {
  yield takeEvery(TYPE.INITIALIZE, initialSaga);
}

export default function * userEditSaga () {
  yield fork(userEditWatcher);
}
