import {ROUTE_ENDPOINT} from "../../utils/route";
import {
    SUBJECT_GET_REQUESTING, 
    USERS_GET_REQUESTING,
    USERS_DELETE_REQUESTING,
    CREATE_USER_REQUESTING,
} from "./constants";
import {call, all, put, takeEvery} from 'redux-saga/effects';
import { 
    subjectGetSuccess, 
    subjectGetError,

    usersGetSuccess,
    usersGetError,

    userDeleteSuccess,
    userDeleteError,

    createUserSuccess,
    createUserError,
} from './actions';
import {handlerAlertModal} from "../generalsEffects/actions";


const reportsUrl = `${ROUTE_ENDPOINT}/reports`;
const usersUrl = `${ROUTE_ENDPOINT}/users`;

const subjectGetRequestingApi = (token) => {
    return fetch(reportsUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => response.json())
        .then(json => {
            if (json.hasOwnProperty("data"))
                return json;
        }).catch((error) => {
            throw error;
        })
};

function* subjectGetRequestingFlow(action) {
    try {
        const {token} = action;
        const subjects = yield call(subjectGetRequestingApi, token);
        yield put(subjectGetSuccess(subjects.data));
        yield put(resetstate());

    } catch (error) {
        yield put(subjectGetError(error));
    }
}

const usersGetRequestingApi = (token) => {
    return fetch(usersUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => response.json())
        .then(json => {
            if (json.hasOwnProperty("data"))
                return json;
        }).catch((error) => {
            throw error;
        })
};

function* usersGetRequestingFlow(action) {
    try {
        const {token} = action;
        const users = yield call(usersGetRequestingApi, token);
        console.log(users)
        yield put(usersGetSuccess(users.data));
        yield put(resetstate());

    } catch (error) {
        yield put(usersGetError(error));
    }
}

const userDeleteRequestingApi = (id, token) => {
    return fetch(`${usersUrl}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => response.json())
        .then(json => {

            if (json.data == null)
                throw json;
                
            if (json.hasOwnProperty("data"))
                return json;

        }).catch((error) => {
            throw error;
        })
};

function* userDeleteRequestingFlow(action) {
    try {
        const {id, token} = action;
        const user_id = yield call(userDeleteRequestingApi, id, token);
        console.log(user_id)
        yield put(userDeleteSuccess(user_id.data));
        yield put(handlerAlertModal("success", "=D Has eliminado a un usuario con éxito"));
        yield put(resetstate());
    } catch (error) {
        yield put(userDeleteError(error));
    }
}
const createUserRequestingApi = (values, token) => {
    let body = {
        role: values.role,
        subject_id: values.subject_id,
        user: values.user,
        name: values.name,
        email: values.email,
        password: values.password,
    }
    return fetch(`${usersUrl}/create`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(json => {

            if (json.data == null)
                throw json;
                
            if (json.hasOwnProperty("data"))
                return json;

        }).catch((error) => {
            throw error;
        })
};

function* createUserRequestingFlow(action) {
    try {
        const {values, token} = action;
        const user = yield call(createUserRequestingApi, values, token);
        yield put(createUserSuccess(user.data));
        yield put(handlerAlertModal("success", "=D Has agregado a un usuario a la lista con éxito"));
        yield put(resetstate());
    } catch (error) {
        yield put(createUserError(error));
    }
}

function* clientWatcher() {
    yield all([
        takeEvery(SUBJECT_GET_REQUESTING, subjectGetRequestingFlow),
        takeEvery(USERS_GET_REQUESTING, usersGetRequestingFlow),
        takeEvery(USERS_DELETE_REQUESTING, userDeleteRequestingFlow),
        takeEvery(CREATE_USER_REQUESTING, createUserRequestingFlow),
    ])
}

export default clientWatcher;
