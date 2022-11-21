import {all, fork} from 'redux-saga/effects';
//
import loginSagas from './auth/login/sagas';
import registerSagas from './auth/register/sagas';
import logoutSagas from './auth/logout/sagas';
import forgotSagas from './auth/forgot/sagas';
import userSagas from './auth/user/sagas';

function* IndexSagas() {
    yield all([
        fork(loginSagas),
        fork(logoutSagas),
        fork(registerSagas),
        fork(userSagas),
        fork(forgotSagas),
    ]);
}
export default IndexSagas