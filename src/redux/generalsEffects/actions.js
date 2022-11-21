import {
    MENU_SIDE_OPTION,
    HANDLER_ALERT_MODAL,
    CLOSE_ALERT_MODAL,

    //acciones para los programas
    SUBJECT_GET_REQUESTING,
    SUBJECT_GET_SUCCESS,
    SUBJECT_GET_ERROR,
} from "./constants";


export const menuSideOption = (value) => ({
    type: MENU_SIDE_OPTION,
    value
});

export const handlerAlertModal = (typeAlert, message) => ({
        type : HANDLER_ALERT_MODAL,
        typeAlert, message
});

export const closeAlertModal = () => ({
        type : CLOSE_ALERT_MODAL,
});


// acciones para los programas

export const subjectGetRequesting = (token) => ({
        type : SUBJECT_GET_REQUESTING,
        token
});
export const subjectGetSuccess = (subjects) => ({
        type : SUBJECT_GET_SUCCESS,
        subjects
});
export const subjectGetError = (error) => ({
        type : SUBJECT_GET_ERROR,
        error
});
