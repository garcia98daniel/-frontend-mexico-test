import {call, all, put, takeEvery} from 'redux-saga/effects';
import {ROUTE_ENDPOINT} from "../../../utils/route";
import {
    userGetError,
    userGetSuccess,
    userResetStates,
    userUpdateError, userUpdatePositionError,
    userUpdatePositionSuccess,
    userUpdateSuccess
} from "./actions";
import {USER_GET_REQUESTING, USER_UPDATE_POSITION_REQUESTING, USER_UPDATE_REQUESTING} from "./constants";
import {clientSet} from "../../client/actions";
// import {DropDownHolder} from "../../../../App";
// import {
//     handlerAlertModal,
// } from "../../generalsEffects/actions";
const meUrl = `${ROUTE_ENDPOINT}/userPlayer/me`;

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
    formData.append('height', values.height || '3');
    formData.append('weight', values.weight || '3');
    formData.append('position', values.position || 'Defensa');
    formData.append('physical_state', values.physical_state || 'Normal');
    formData.append('right_foot', values.right_foot || 0);
    formData.append('left_foot', values.left_foot || 0);
    formData.append('photo_url', values.photo_url || null);
    if (values?.alt_photo_url?.length > 0){
        values.alt_photo_url.map((fileItem, index) => {
            // let file = {uri: fileItem.uri, name: fileItem.fileName, type: fileItem.type || 'image/jpeg'};
            // console.log(fileItem)
            formData.append(`photo_url`, fileItem);
        });
    }
    return fetch(`${meUrl}/profile/update?_method=patch`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Authorization: `Bearer ${token}`,
        },
        body: formData,
        // body: JSON.stringify(formData),
        // body: JSON.stringify(body),

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
        yield put(handlerAlertModal('success', 'Usuario actualizado con éxito.'));
        yield put(userResetStates());
    } catch (error) {
        // if (error === 'Debe cambiar al menos un dato.')
        yield put(handlerAlertModal('error', `Ups! algo salió mal, ${error.message}`));
        yield put(userUpdateError(error));
    }
}

function* userWatcher() {
    yield all([
        takeEvery(USER_GET_REQUESTING, userGetFlow),
        takeEvery(USER_UPDATE_REQUESTING, userUpdateFlow),
        // takeEvery(USER_UPDATE_POSITION_REQUESTING, userUpdatePositionFlow),
    ])
}

export default userWatcher;
