import {ROUTE_ENDPOINT} from "../../utils/route";
import {SUBJECT_GET_REQUESTING} from "./constants";
import {call, all, put, takeEvery} from 'redux-saga/effects';
import { subjectGetSuccess, subjectGetError } from './actions';
// import {handlerAlertModal} from "../menusModals/actions";

const reportsUrl = `${ROUTE_ENDPOINT}/reports`;

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
    } catch (error) {
        yield put(subjectGetError(error));
    }
}

function* clientWatcher() {
    yield all([
        takeEvery(SUBJECT_GET_REQUESTING, subjectGetRequestingFlow),
    ])
}

export default clientWatcher;
