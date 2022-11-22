import {
  MENU_SIDE_OPTION,
  HANDLER_ALERT_MODAL,
  CLOSE_ALERT_MODAL,
  RESETSTATE,
  //acciones para los programas
  SUBJECT_GET_REQUESTING,
  SUBJECT_GET_SUCCESS,
  SUBJECT_GET_ERROR,

  //constantes para obtener usuarios
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

} from "./constants";

const initialState = {
  menuSideOptionValue: "/reportes",
  alertModal: {
    isOpen: false,
    type: "",
    message: "",
  },

  reportsPage: {
    requesting: false,
    success: false,
    error: "",
    subjects: [],
  },

  usersPage: {
    requesting: false,
    success: false,
    error: "",
    users: [],
  },

  createUserValues: {
    role: "",
    subject_id: "",
    user: "",
    name: "",
    email: "",
    password: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBJECT_GET_REQUESTING:
      return {
        ...state,
        reportsPage: {
          ...state.reportsPage,
          requesting: true,
          success: false,
          error: "",
        },
      };
    case SUBJECT_GET_SUCCESS:
      return {
        ...state,
        reportsPage: {
          ...state.reportsPage,
          requesting: false,
          success: true,
          error: "",
          subjects: action.subjects,
        },
      };
    case SUBJECT_GET_ERROR:
      return {
        ...state,
        reportsPage: {
          ...state.reportsPage,
          requesting: false,
          success: false,
          error: action.error,
        },
      };

    //get users
    case USERS_GET_REQUESTING:
      return {
        ...state,
        usersPage: {
          ...state.usersPage,
          requesting: true,
          success: false,
          error: "",
        },
      };
    case USERS_GET_SUCCESS:
      return {
        ...state,
        usersPage: {
          ...state.usersPage,
          requesting: false,
          success: true,
          error: "",
          users: action.users,
        },
      };
    case USERS_GET_ERROR:
      return {
        ...state,
        usersPage: {
          ...state.usersPage,
          requesting: false,
          success: false,
          error: action.error,
        },
      };
    //delete users
    case USERS_DELETE_REQUESTING:
      return {
        ...state,
        usersPage: {
          ...state.usersPage,
          requesting: true,
          success: false,
          error: "",
        },
      };
    case USERS_DELETE_SUCCESS:
      return {
        ...state,
        usersPage: {
          requesting: false,
          success: true,
          error: "",
          users: state.usersPage.users.filter(
            (user) => user.id != action.user_id
          ),
        },
      };
    case USERS_DELETE_ERROR:
      return {
        ...state,
        usersPage: {
          ...state.usersPage,
          requesting: false,
          success: false,
          error: action.error,
        },
      };

    case MENU_SIDE_OPTION:
      return {
        ...state,
        menuSideOptionValue: action.value,
      };
    case HANDLER_ALERT_MODAL:
      return {
        ...state,
        alertModal: {
          isOpen: true,
          type: action.typeAlert,
          message: action.message,
        },
      };
    case CLOSE_ALERT_MODAL:
      return {
        ...state,
        alertModal: {
          isOpen: false,
          type: "",
          message: "",
        },
      };

    case CHANGE_CREATE_USER_FORM:
      return {
        ...state,
        createUserValues: {
          ...state.createUserValues,
          [action.key]: action.value,
        },
      };

    //eliminar usuario
    case CREATE_USER_REQUESTING:
      return {
        ...state,
        usersPage: {
          ...state.usersPage,
          requesting: true,
          success: false,
          error: "",
        },
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        usersPage: {
          requesting: false,
          success: true,
          error: "",
          users: [
            ...state.usersPage.users,
            action.user
          ]
        },
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        usersPage: {
          ...state.usersPage,
          requesting: false,
          success: false,
          error: action.error,
        },
      };
    case RESETSTATE:
      return {
        reportsPage: {
          ...state.reportsPage,
          requesting: false,
          success: false,
          error: "",
        },

        usersPage: {
          ...state.usersPage,
          requesting: false,
          success: false,
          error: "",
        },
      };
    default:
      return state;
  }
};

export default reducer;
