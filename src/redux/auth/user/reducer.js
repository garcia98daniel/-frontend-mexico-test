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
                    id: action.user.id,
                    role: action.user.role,
                    email: action.user.email,
                    first_name: action.user.first_name,
                    last_name: action.user.last_name,
                    date_of_birth: action.user.date_of_birth,
                    biological_sex: action.user.biological_sex,
                    nacionality: action.user.nacionality,
                    country_of_residence: action.user.country_of_residence,
                    city_of_residence: action.user.city_of_residence,
                    department_of_residence: action.user.department_of_residence,
                    height: action.user.height,
                    weight: action.user.weight,
                    position: action.user.position,
                    physical_state: action.user.physical_state,
                    right_foot: action.user.right_foot,
                    left_foot: action.user.left_foot,
                    available_money: action.user.available_money,
                    photo_url: action.user.photo_url,
                    country_code_phone: '+57',
                    phone_number: action.user.phone_number,
                },
            };
        case USER_UPDATE_ERROR:
            return {
                ...state,
                requesting: false,
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
                    role: state.user.hasOwnProperty('id') ? state.values.role : '',
                    email: state.user.hasOwnProperty('id') ? state.values.email : '',
                    first_name: state.user.hasOwnProperty('id') ? state.values.first_name : 'iSoccer',
                    last_name: state.user.hasOwnProperty('id') ? state.values.last_name : '',
                    date_of_birth: state.user.hasOwnProperty('id') ? state.values.date_of_birth : '',
                    biological_sex: state.user.hasOwnProperty('id') ? state.values.biological_sex : '',
                    nacionality: state.user.hasOwnProperty('id') ? state.values.nacionality : '',
                    country_of_residence: state.user.hasOwnProperty('id') ? state.values.country_of_residence : '',
                    city_of_residence: state.user.hasOwnProperty('id') ? state.values.city_of_residence : '',
                    department_of_residence: state.user.hasOwnProperty('id') ? state.values.department_of_residence : '',
                    height: state.user.hasOwnProperty('id') ? state.values.height : 0,
                    weight: state.user.hasOwnProperty('id') ? state.values.weight : 0,
                    position: state.user.hasOwnProperty('id') ? state.values.position : '',
                    physical_state: state.user.hasOwnProperty('id') ? state.values.physical_state : '',
                    right_foot: state.user.hasOwnProperty('id') ? state.values.right_foot : 1,
                    left_foot: state.user.hasOwnProperty('id') ? state.values.left_foot : 1,
                    available_money: state.user.hasOwnProperty('id') ? state.values.available_money : 0,
                    photo_url: state.user.hasOwnProperty('id') ? state.values.photo_url : '',
                    country_code_phone: state.user.hasOwnProperty('id') ? state.values.country_code_phone : '+57',
                    phone_number: state.user.hasOwnProperty('id') ? state.values.phone_number : '',
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
                    id: '',
                    role: '',
                    email: '',
                    email_confirmed: 0,
                    confirmation_code: '',
                    first_name: '',
                    last_name: '',
                    date_of_birth: '',
                    biological_sex: '',
                    nacionality: '',
                    country_of_residence: '',
                    city_of_residence: '',
                    department_of_residence: '',
                    height: 0,
                    weight: 0,
                    position: '',
                    physical_state: '',
                    right_foot: 0,
                    left_foot: 0,
                    available_money: 0,
                    photo_url: '',
                    country_code_phone: '+57',
                    phone_number: '',
                },
            };
        default:
            return state;
    }
};

export default reducer;
