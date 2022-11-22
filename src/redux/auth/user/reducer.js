import {
    USER_CHANGE_FORM,
    USER_GET_ERROR,
    USER_GET_REQUESTING,
    USER_GET_SUCCESS,
    USER_RESET_STATES, USER_RESET_STATES_LOGOUT,
    USER_UPDATE_ERROR, 
    USER_UPDATE_REQUESTING,
    USER_UPDATE_SUCCESS
} from "./constants";

const initialState = {
    requesting: false,
    success: false,
    error: '',
    user: {},
    values: {
        id:'',
        userNickName:'',
        name:'',
        email:'',
        subject_pivot:'',
        roles:[],
        password:'',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_GET_REQUESTING:
            return {
                ...state,
                requesting: true,
                success: false,
                error: '',
            };
        case USER_GET_SUCCESS:
            // console.log(action);
            return {
                ...state,
                requesting: false,
                success: true,
                user: action.user,
                values: {
                    id: action.user?.id,
                    userNickName:action.user?.user,
                    name:action.user?.name,
                    email:action.user?.email,
                    roles:action.user?.roles,
                    subject_pivot:action.user?.subject_pivot,
                },
            };
        case USER_GET_ERROR:
            return {
                ...state,
                requesting: false,
                error: action.error,
            };
        case USER_UPDATE_REQUESTING:
            return {
                ...state,
                requesting: true,
                success: false,
                error: '',
            };
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                user: action.user,
                values: {
                    id: action.user?.id,
                    userNickName:action.user?.user,
                    name:action.user?.name,
                    email:action.user?.email,
                    roles:action.user?.roles,
                    subject_pivot:action.user?.subject_pivot,
                },
            };
        case USER_UPDATE_ERROR:
            return {
                ...state,
                requesting: false,
                success:false,
                error: action.error,
            };
        case USER_CHANGE_FORM:
            return {
                ...state,
                values: {...state.values, [action.key]: action.value},
            };
        case USER_RESET_STATES:
            return {
                ...state,
                requesting: false,
                success: false,
                error: '',
                values: {
                        id: state.user.hasOwnProperty('id') ? state.values.id : '',
                        userNickName: state.user.hasOwnProperty('user') ? state.values.user : '',
                        name: state.user.hasOwnProperty('name') ? state.values.name : '',
                        email: state.user.hasOwnProperty('email') ? state.values.email : '',
                        subject_pivot: state.user.hasOwnProperty('subject_pivot') ? state.values.subject_pivot : '',
                        roles:state.user.hasOwnProperty('roles') ? state.values.roles : '',
                        password: '',
                },
            };
        case USER_RESET_STATES_LOGOUT:
            return {
                ...state,
                requesting: false,
                success: false,
                error: '',
                user: {},
                values: {
                    id:'',
                    userNickName:'',
                    name:'',
                    email:'',
                    subject_pivot:'',
                    roles:[],
                    password:'',
                },
            };
        default:
            return state;
    }
};

export default reducer;
