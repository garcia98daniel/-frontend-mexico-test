import {call, all, put, takeEvery} from 'redux-saga/effects';
import {ROUTE_ENDPOINT} from "../../../utils/route";
import {
    loginSuccess,
    loginError,
    loginResetStates,
} from "./actions";
import {LOGIN_REQUESTING} from "./constants";
import {clientSet} from "../../client/actions";
import {userGetSuccess} from "../user/actions";

import {handlerAlertModal} from "../../generalsEffects/actions";

const loginUrl = `${ROUTE_ENDPOINT}/login`;

const loginApi = (values) => {
    let body = {
        user: values.user,
        password: values.password,
    };
    return fetch(`${loginUrl}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            // console.log(response.status)
            if (response.status === 500)
                throw "Error interno del servidor";

            return response.json()
        })
        .then(json => {
        //   console.log(json)
          if(json.hasOwnProperty('errors')){
            throw json;
        }

        if (json.hasOwnProperty('token')){
            // console.log("token")
            return json;
        }
        throw json;
        }).catch((error) => {
            throw error;
        })
};

function* loginFlow(action) {
    try {
        const {values} = action;
        const user = yield call(loginApi, values);
        // console.log(user.token);
            yield put(loginSuccess());
            yield put(userGetSuccess(user.data));
            yield put(clientSet(user.token));
            yield put(loginResetStates());
        
    } catch (error) {
        yield put(handlerAlertModal("error", "Ups!!. Algo salió mal, vuélvelo a intentar más tarde"));
        yield put(loginError(error));
    }
}

function* loginWatcher() {
    yield all([
        takeEvery(LOGIN_REQUESTING, loginFlow),
    ])
}

export default loginWatcher;
