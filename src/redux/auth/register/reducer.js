import {
    REGISTER_CHANGE_FORM,
    REGISTER_CLEAN_FORM,
    REGISTER_ERROR,
    REGISTER_REQUESTING,
    REGISTER_SUCCESS,
    REGISTER_LOCATIONS_DATA_REQUESTING,
    REGISTER_LOCATIONS_DATA_SUCCESS,
    REGISTER_LOCATIONS_DATA_ERROR,
    REGISTER_SET_CITYS_FORM,
    REGISTER_RESET_STATE
} from "./constants";

const initialState = {
    requesting: false,
    success: false,
    error: '',

    locations_data_requesting: false,
    locations_data_success: false,
    locations_data_error: '',
    all_locations: [],
    departaments:'',
    citys:'',
    values: {
        first_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        biological_sex: '',
        department_of_residence: '',
        city_of_residence: '',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUESTING:
            return {
                ...state,
                requesting: true,
                success: false,
                error: '',
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
            };
        case REGISTER_ERROR:
            return {
                ...state,
                requesting: false,
                error: action.error,
            };
        case REGISTER_LOCATIONS_DATA_REQUESTING:
            return {
                ...state,
                locations_data_requesting: true,
                locations_data_success: false,
                locations_data_error: '',
            };
        case REGISTER_LOCATIONS_DATA_SUCCESS:
            return {
                ...state,
                locations_data_requesting: false,
                locations_data_success: true,
                all_locations: action.locations,
                departaments: action.locations.map((location, index)=>{
                    return { key: location.departamento+""+index, text: location.departamento, value: location.departamento }
                }),
            };
        case REGISTER_LOCATIONS_DATA_ERROR:
            return {
                ...state,
                locations_data_requesting: false,
                locations_data_error: action.error,
            };
        case REGISTER_SET_CITYS_FORM:
            // if(state.all_locations.length > 0){
            //     var citys_item = state.all_locations.find((item) => item.departamento === state.values.department_of_residence).ciudades
            //     console.log(citys_item)
            // }
            return {
                ...state,
                citys: state.all_locations.find((item) => item.departamento === state.values.department_of_residence)?.ciudades
                .map((item, index)=>{
                    return { key: item+""+index, text: item, value: item }
                }), 
            }
        case REGISTER_CHANGE_FORM:
            return {
                ...state,
                values: {...state.values, [action.key]: action.value}
            };
        case REGISTER_CLEAN_FORM:
            return {
                ...state,
                success: false,
                values: {
                    first_name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    biological_sex: '',
                    department_of_residence: '',
                    city_of_residence: '',
                },
            };
        case REGISTER_RESET_STATE:
            return {
                ...state,
                requesting: false,
                success: false,
                error: '',
            };
        default:
            return state;
    }
};

export default reducer;