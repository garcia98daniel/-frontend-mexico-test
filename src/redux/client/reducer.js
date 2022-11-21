import {
    CLIENT_SET,
    CLIENT_UNSET,
} from "./constants";


const initialState = {
    requesting: false,
    success: false,
    error: '',
    logged: false,
    token: null,
    checking: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CLIENT_SET:
            return{
                ...state,
                token: action.token,
                requesting: false,
                logged: true,
                checking: false,
            };
        case CLIENT_UNSET:
            return {
                ...state,
                token: null,
                logged: false,
                checking: false,
            };
        // case CHECK_JWT_REQUESTING:
        //     return {
        //         ...state,
        //         requesting: true,
        //         logged: false,
        //         checking: false,
        //     };
        // case CHECK_JWT_ERROR:
        //     return {
        //         ...state,
        //         requesting: false,
        //         logged: false,
        //         checking: false,
        //     };
        default:
            return state;
    }
};

export default reducer;
