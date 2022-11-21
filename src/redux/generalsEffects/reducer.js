import {
    MENU_SIDE_OPTION,
    HANDLER_ALERT_MODAL,
    CLOSE_ALERT_MODAL,

    //acciones para los programas
    SUBJECT_GET_REQUESTING,
    SUBJECT_GET_SUCCESS,
    SUBJECT_GET_ERROR,
} from "./constants";


const initialState = {
    menuSideOptionValue: "/reportes",
    alertModal : {
        isOpen: false,
        type: "",
        message: "",
    },

    reportsPage:{
        requesting: false,
        success: false,
        error: "",
        subjects:[],
    }

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBJECT_GET_REQUESTING:
            return{
                ...state,
                reportsPage:{
                    ...state.reportsPage,
                    requesting: true,
                    success: false,
                    error: "",
                }
            };
        case SUBJECT_GET_SUCCESS:
            return{
                ...state,
                reportsPage:{
                    ...state.reportsPage,
                    requesting: false,
                    success: true,
                    error: "",
                    subjects: action.subjects,
                }
            };
        case SUBJECT_GET_ERROR:
            return{
                ...state,
                reportsPage:{
                    ...state.reportsPage,
                    requesting: false,
                    success: false,
                    error: action.error,
                }
            };

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
