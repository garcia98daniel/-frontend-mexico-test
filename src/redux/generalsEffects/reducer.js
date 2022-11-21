import {
    MENU_SIDE_OPTION,
    HANDLER_ALERT_MODAL,
    CLOSE_ALERT_MODAL,
} from "./constants";


const initialState = {
    menuSideOptionValue: "/reportes",
    alertModal : {
        isOpen: false,
        type: "",
        message: "",
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MENU_SIDE_OPTION:
            return{
                ...state,
                menuSideOptionValue: action.value 
            };
        case HANDLER_ALERT_MODAL : 
            return {
                ...state,
                alertModal : {
                    isOpen: true,
                    type: action.typeAlert,
                    message: action.message,
                },
            };
        case CLOSE_ALERT_MODAL : 
            return {
                ...state,
                alertModal : {
                    isOpen: false,
                    type: "",
                    message: "",
                },
            };
        default:
            return state;
    }
};

export default reducer;
