import {call, all, put, takeEvery} from 'redux-saga/effects';
import {ROUTE_ENDPOINT} from "../../../utils/route";
import {
    loginSuccess,
    loginError,
    loginFacebookSuccess,
    loginFacebookError,
    loginResetStates,
} from "./actions";
import {LOGIN_REQUESTING, LOGIN_FACEBOOK_REQUESTING, LOGIN_MOBILE_REQUESTING} from "./constants";
import {clientSet} from "../../client/actions";
import {userGetSuccess} from "../user/actions";

// import {handlerAlertModal} from "../../menusModals/actions";

// import AsyncStorage from '@react-native-community/async-storage';
// import {DropDownHolder} from "../../../../App";

const loginUrl = `${ROUTE_ENDPOINT}/login`;

const loginApi = (values) => {
    let body = {
        email: values.email,
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
        if(user.data.email_confirmed === 1){ //email confirmed
            yield put(loginSuccess());
            yield put(userGetSuccess(user.data));
            yield put(clientSet(user.token));
            yield put(loginResetStates());
        }else{
            let error = {email_confirmed: "'Ups! Debes confirmar tu correo antes."}
            // yield put(handlerAlertModal('error', 'Ups! Debes confirmar tu correo antes.'));
            throw error;
        }
        // yield put(setTokenStorage(token));
    } catch (error) {
        // console.log("catch error loginflow")
        // yield put(handlerAlertModal('error', 'Ups! Al parecer hubo un error, por favor verifica nuevamente.'));
        yield put(loginError(error));
    }
}

// const loginFacebookApi = (response) => {
//     let body = {
//         name: response.name,
//         email: response.email,
//         photo: response.picture.data.url,
//         token_facebook: response.id,
//         term: true,
//     };
//     return fetch(`${loginUrl}Facebook`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body)
//     })
//         .then(response => response.json())
//         .then(json => {
//             if (json.code === 422)
//                 throw json.data;
//             if (json.code === 400)
//                 throw json.data;
//             if (json.hasOwnProperty('access_token'))
//                 return json.access_token;
//             throw ''
//         }).catch((error) => {
//             throw error;
//         })
// };

// function* loginFacebookFlow(action) {
//     try {
//         const {response} = action;
//         const token = yield call(loginFacebookApi, response);
//         yield put(loginFacebookSuccess());
//         yield put(loginResetStates());
//         yield put(checkJWTRequesting(token));
//         yield put(setTokenStorage(token));
//     } catch (error) {
//         if (error.hasOwnProperty('email')) {
//             yield put(handlerAlertModal('error',  error.email[0]));
//         }
//         yield put(loginFacebookError(error));
//     }
// }



function* loginWatcher() {
    yield all([
        takeEvery(LOGIN_REQUESTING, loginFlow),
        // takeEvery(LOGIN_FACEBOOK_REQUESTING, loginFacebookFlow),
    ])
}

export default loginWatcher;
