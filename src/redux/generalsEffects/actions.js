import {
    MENU_SIDE_OPTION,
    HANDLER_ALERT_MODAL,
    CLOSE_ALERT_MODAL,
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