import {call, all, put, takeEvery} from 'redux-saga/effects';
// import { push } from 'react-router-redux';
import Router from 'next/router';
import {ROUTE_ENDPOINT, ROUTE_COLOMBIA_LOCATIONS} from "../../../utils/route";
import {loginRequesting} from "../login/actions";
import 
{
    registerCleanForm, 
    registerError, 
    registerSuccess,
    registerLocationsDataSuccess,
    registerLocationsDataError,
    registerResetState
} from "./actions";
import {REGISTER_REQUESTING, REGISTER_LOCATIONS_DATA_REQUESTING} from "./constants";
// import NavigationService from "../../../utils/NavigationService";
// import {DropDownHolder} from "../../../../App";
// import {handlerAlertModal} from "../../menusModals/actions";

const registerUrl = `${ROUTE_ENDPOINT}/register`;
const colombiaLocationsUrl = `${ROUTE_COLOMBIA_LOCATIONS}`;

const registerApi = (values) => {
    let body = {
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        first_name: values.first_name,
        biological_sex: values.biological_sex,
        department_of_residence: values.department_of_residence,
        city_of_residence: values.city_of_residence
    };
    return fetch(`${registerUrl}`, {
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
                // console.log(json)
                if(json.hasOwnProperty('errors')){
                    // console.log("error json")
                    throw json;
                }

                if (json.data.hasOwnProperty('id')){
                    // console.log("RETURN TRUE")
                    return true;
                }

                // console.log("error ultimo json")
                throw json;
            }).catch(error => {
                // console.log("catch")
                throw error;
            })
};

function* registerFlow(action) {
    try {
        console.log(action);
        const {values, navigate} = action;
        yield call(registerApi, values);
        yield put(registerSuccess());
        yield put(registerResetState());
        yield put(registerCleanForm());
        // yield put(loginRequesting(values));
        // NavigationService.navigate('ListProduct');
        // router.push('/email-sent');

    } catch (error) {
        // console.log(error);
        if(error.message === "The given data was invalid."){
        console.log("Los datos proporcionados no son válidos.");
        }
        // yield put(handlerAlertModal('error', 'Ups! Al parecer hubo un error, por favor verifica nuevamente.'));
        yield put(registerError(error));
    }
}


const registerLocationsDataApi = () => {
    return fetch(`${colombiaLocationsUrl}`)
        .then(response => response.json())
        .then(data => {
            // console.log(json)
            if (data)
                return data;
            throw json.data;
        }).catch((error) => {
            throw error;
        })
};

function* registerLocationsDataFlow(action) {
    try {
        const locations = yield call(registerLocationsDataApi);
        yield put(registerLocationsDataSuccess(locations));
    } catch (error) {
        // yield put(handlerAlertModal('error', 'Ups! Al parecer hubo un error, por favor verifica nuevamente.'));
        yield put(registerLocationsDataError(error));
    }
}

function* registerWatcher() {
    yield all([
        takeEvery(REGISTER_REQUESTING, registerFlow),
        takeEvery(REGISTER_LOCATIONS_DATA_REQUESTING, registerLocationsDataFlow),
    ])
}

export default registerWatcher;