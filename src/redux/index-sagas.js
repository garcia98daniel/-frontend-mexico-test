import {all, fork} from 'redux-saga/effects';
//
import loginSagas from './auth/login/sagas';
import logoutSagas from './auth/logout/sagas';
import userSagas from './auth/user/sagas';

function* IndexSagas() {
    yield all([
        fork(loginSagas),
        fork(logoutSagas),
        fork(userSagas),
    ]);
}
export default IndexSagas