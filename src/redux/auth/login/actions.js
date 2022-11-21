import {
    // LOGIN_FACEBOOK_REQUESTING,
    // LOGIN_FACEBOOK_SUCCESS, LOGIN_MOBILE_ERROR, LOGIN_MOBILE_REQUESTING, LOGIN_MOBILE_SUCCESS,
    LOGIN_CHANGE_FORM,
    LOGIN_ERROR, LOGIN_FACEBOOK_ERROR,
    LOGIN_REQUESTING, LOGIN_RESET_STATES, 
    LOGIN_SHOW_HIDDEN_MODAL,
    LOGIN_SHOW_HIDDEN_MOBILE_,
    LOGIN_SUCCESS,
} from "./constants";

export const loginRequesting = (values) => ({
    type: LOGIN_REQUESTING,
    values,
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});

export const loginError = (error) => ({
    type: LOGIN_ERROR,
    error,
});

// export const loginFacebookRequesting = (response) => ({
//     type: LOGIN_FACEBOOK_REQUESTING,
//     response,
// });

// export const loginFacebookSuccess = () => ({
//     type: LOGIN_FACEBOOK_SUCCESS,
// });

// export const loginFacebookError = (error) => ({
//     type: LOGIN_FACEBOOK_ERROR,
//     error,
// });

// export const loginMobileRequesting = (response, values = {}) => ({
//     type: LOGIN_MOBILE_REQUESTING,
//     response, values,
// });

// export const loginMobileSuccess = () => ({
//     type: LOGIN_MOBILE_SUCCESS,
// });

// export const loginMobileError = (error) => ({
//     type: LOGIN_MOBILE_ERROR,
//     error,
// });

export const loginShowHiddenModal = (value) => ({
    type: LOGIN_SHOW_HIDDEN_MODAL,
    value,
});

export const loginChangeForm = (key, value) => ({
    type: LOGIN_CHANGE_FORM,
    key, value,
});

export const loginResetStates = () => ({
    type: LOGIN_RESET_STATES,
});