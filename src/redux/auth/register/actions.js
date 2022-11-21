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
} from "./constants";

export const registerRequesting = (values) => ({
    type: REGISTER_REQUESTING,
    values,
});

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS,
});

export const registerError = (error) => ({
    type: REGISTER_ERROR,
    error,
});

export const registerLocationsDataRequesting = () => ({
    type: REGISTER_LOCATIONS_DATA_REQUESTING,
});
export const registerLocationsDataSuccess = (locations) => ({
    type: REGISTER_LOCATIONS_DATA_SUCCESS,
    locations,
});
export const registerLocationsDataError = (error) => ({
    type: REGISTER_LOCATIONS_DATA_ERROR,
    error,
});

export const registerSetCitysForm = () => ({
    type: REGISTER_SET_CITYS_FORM
});

export const registerChangeForm = (key, value) => ({
    type: REGISTER_CHANGE_FORM,
    key, value,
});

export const registerCleanForm = () => ({
    type: REGISTER_CLEAN_FORM,
});

export const registerResetState = () => ({
    type: REGISTER_RESET_STATE,
});