import {call, all, put, takeEvery} from 'redux-saga/effects';
import {ROUTE_ENDPOINT} from "../../../utils/route";
import {
    userGetError,
    userGetSuccess,
    userResetStates,
    userUpdateError,
    userUpdateSuccess
} from "./actions";
import {USER_GET_REQUESTING, USER_UPDATE_REQUESTING} from "./constants";
import {clientSet} from "../../client/actions";

import {handlerAlertModal} from "../../generalsEffects/actions";

const meUrl = `${ROUTE_ENDPOINT}/me`;

const userGetApi = (token) => {
    return fetch(`${meUrl}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then(json => {
            if (json.data.hasOwnProperty('id')){
                return json.data;
            }

            throw json;
        }).catch((error) => {
            console.log("erro json");
            throw error;
        })
};

function* userGetFlow(action) {
    try {
        const {token} = action;
        const user = yield call(userGetApi, token);
        yield put(userGetSuccess(user));
        yield put(clientSet(token));
        yield put(userResetStates());
    } catch (error) {
        console.log(error);
        yield put(userGetError(error));
    }
}

const userUpdateApi = (token, values) => {
    let formData = new FormData();
    // formData.append('_method', 'patch');
    formData.append('user', values.userNickName || 'default');
    formData.append('name', values.name || 'default');
    formData.append('email', values.email || 'email');
    formData.append('password', values.password);
   
    return fetch(`${meUrl}/edit?_method=patch`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })
        .then(response => {
                if(response.status === 500)
                throw "Error interno del servidor";
            return response.json();
        })
        .then(json => {
            // console.log(json)
            if (json.data.hasOwnProperty('id'))
                return json.data;
            throw json;
        }).catch((error) => {
            throw error;
        })
};

function* userUpdateFlow(action) {
    try {
        const {token, values} = action;
        // console.log(values);
        const user = yield call(userUpdateApi, token, values);
        yield put(userUpdateSuccess(user));
        yield put(handlerAlertModal("success", "=D Has actualizado tus datos con éxito"));
        yield put(userResetStates());
    } catch (error) {
        yield put(userUpdateError(error));
    }
}

function* userWatcher() {
    yield all([
        takeEvery(USER_GET_REQUESTING, userGetFlow),
        takeEvery(USER_UPDATE_REQUESTING, userUpdateFlow),
    ])
}

export default userWatcher;
