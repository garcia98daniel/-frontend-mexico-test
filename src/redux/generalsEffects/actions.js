import {
    MENU_SIDE_OPTION,
    HANDLER_ALERT_MODAL,
    CLOSE_ALERT_MODAL,
    RESETSTATE,

    //constantes para los programas
    SUBJECT_GET_REQUESTING,
    SUBJECT_GET_SUCCESS,
    SUBJECT_GET_ERROR,

    //constantes para los obtener usuarios
    USERS_GET_REQUESTING,
    USERS_GET_SUCCESS,
    USERS_GET_ERROR,


    //constantes para eliminar un usuario
    USERS_DELETE_REQUESTING,
    USERS_DELETE_SUCCESS,
    USERS_DELETE_ERROR,

    CHANGE_CREATE_USER_FORM,
    //constantes para crear un usuario
    CREATE_USER_REQUESTING,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,

    //constantes para cambiar filtro de usuarios
    CHANGE_FILTER_USERS
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
export const resetstate = () => ({
        type : RESETSTATE,
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

// acciones para los obtener los ususarios

export const usersGetRequesting = (token) => ({
        type : USERS_GET_REQUESTING,
        token
});
export const usersGetSuccess = (users) => ({
        type : USERS_GET_SUCCESS,
        users
});
export const usersGetError = (error) => ({
        type : USERS_GET_ERROR,
        error
});
// acciones para los eliminar ususarios

export const userDeleteRequesting = (id, token) => ({
        type : USERS_DELETE_REQUESTING,
        id, token
});
export const userDeleteSuccess = (user_id) => ({
        type : USERS_DELETE_SUCCESS,
        user_id
});
export const userDeleteError = (error) => ({
        type : USERS_DELETE_ERROR,
        error
});

export const changeCreateUserForm = (key, value) => ({
        type : CHANGE_CREATE_USER_FORM,
        key, value
});
// acciones para los crear ususarios

export const createUserRequesting = (values, token) => ({
        type : CREATE_USER_REQUESTING,
        values, token
});
export const createUserSuccess = (user) => ({
        type : CREATE_USER_SUCCESS,
        user
});
export const createUserError = (error) => ({
        type : CREATE_USER_ERROR,
        error
});

//constantes para cambiar filtro de usuarios
export const changeFilterUsers = (value) => ({
        type : CHANGE_FILTER_USERS,
        value
});
