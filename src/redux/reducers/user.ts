import { UserState } from '../../types';
import {
  UserActions,
  GOOGLE_SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  TOGGLE_NOTIFICATIONS,
  EMAIL_SIGN_IN_START,
  CHECK_USER_SESSION_SUCCESS,
  CHECK_USER_SESSION_FAILURE,
  SIGN_UP_FAILURE,
  PASSWORD_REQUEST_FAILURE,
  PASSWORD_REQUEST_SUCCESS,
  CLEAR_NOTIFICATIONS,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAILURE,
  ADMIN_MODIFY_USER,
  ADMIN_MODIFY_RESET,
  ADMIN_FETCH_USERS,
  ADMIN_ACTIONS_FAILURE,
  ADMIN_ACTIONS_SUCCESS,
  CONFIRM_EMAIL_FAILURE,
  CONFIRM_EMAIL_SUCCESS,
  FILTER_ADMIN_USER_LIST,
  PROCESS_PAYMENTS,
  ADMIN_GET_ALL_USERS,
  TOGGLE_LOADING_STATUS,
  UPLOAD_PROFILE_PHOTO,
  UPDATE_USER_PROFILE_START,
} from '../Types/user';

export default function user(
  state: UserState = {
    filteredUsers: [],
    notification: null,
    isLoading: false,
    currentUser: null,
    token: undefined,
    sessionExp: undefined,
    error: null,
    toggleNotifications: false,
    adminModification: null,
    adminUsers: [],
  },

  action: UserActions
): UserState {
  switch (action.type) {
    case TOGGLE_LOADING_STATUS: {
      const { status } = action.payload;
      return {
        ...state,
        isLoading: status,
      };
    }
    case GOOGLE_SIGN_IN_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        adminModification: null,
      };
    }
    case EMAIL_SIGN_IN_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        adminModification: null,
      };
    }
    case SIGN_IN_SUCCESS: {
      const { token, user } = action.payload.data;

      return {
        ...state,
        notification: 'Sign in successfull',
        isLoading: false,
        currentUser: user,
        token: token,
      };
    }

    case TOGGLE_NOTIFICATIONS: {
      const { status } = action.payload;
      return { ...state, toggleNotifications: status };
    }

    case CLEAR_NOTIFICATIONS: {
      return { ...state, notification: null, error: null };
    }

    case CHECK_USER_SESSION_SUCCESS: {
      const { timeLimit } = action.payload;
      return {
        ...state,
        sessionExp: timeLimit,
      };
    }

    case UPDATE_USER_PROFILE_SUCCESS: {
      const { user } = action.payload;

      return {
        ...state,
        notification: 'Update successfull',
        currentUser: user,
        isLoading: false,
      };
    }

    case PASSWORD_UPDATE_SUCCESS: {
      return {
        ...state,
        notification: 'Password Updated',
      };
    }

    case ADMIN_MODIFY_USER: {
      const { user } = action.payload;
      return {
        ...state,
        adminModification: user,
      };
    }

    case ADMIN_MODIFY_RESET: {
      return {
        ...state,
        adminModification: null,
      };
    }

    case ADMIN_GET_ALL_USERS:
    case UPDATE_USER_PROFILE_START:
    case UPLOAD_PROFILE_PHOTO: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ADMIN_FETCH_USERS: {
      const { users } = action.payload;

      return {
        ...state,
        adminUsers: users,
        filteredUsers: users,
        isLoading: false,
      };
    }

    case FILTER_ADMIN_USER_LIST: {
      const { searchQuery } = action.payload;

      if (searchQuery.trim() === '') {
        return {
          ...state,
          filteredUsers: [...state.adminUsers],
          notification: null,
        };
      }
      const filteredQuery = state.adminUsers.filter((user) => {
        const { firstname, lastname } = user;
        const name = `${firstname} ${lastname}`;
        return name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      if (filteredQuery.length > 0) {
        return {
          ...state,
          filteredUsers: [...filteredQuery],
          notification: null,
        };
      } else {
        return {
          ...state,
          filteredUsers: [],
          notification: 'User Not Found!',
        };
      }
    }

    case PROCESS_PAYMENTS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ADMIN_ACTIONS_SUCCESS:
    case PASSWORD_REQUEST_SUCCESS:
    case CONFIRM_EMAIL_SUCCESS: {
      const { message } = action.payload;

      return {
        ...state,
        notification: message,
        isLoading: false,
      };
    }

    case SIGN_IN_FAILURE:
    case CHECK_USER_SESSION_FAILURE:
    case SIGN_UP_FAILURE:
    case ADMIN_ACTIONS_FAILURE:
    case UPDATE_USER_PROFILE_FAILURE:
    case PASSWORD_UPDATE_FAILURE:
    case PASSWORD_REQUEST_FAILURE:
    case CONFIRM_EMAIL_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        isLoading: false,
        error: error,
      };
    }

    case SIGN_OUT: {
      return {
        ...state,
        filteredUsers: [],
        notification: null,
        isLoading: false,
        currentUser: null,
        token: undefined,
        sessionExp: undefined,
        error: null,
        toggleNotifications: false,
        adminModification: null,
        adminUsers: [],
      };
    }

    default:
      return state;
  }
}
