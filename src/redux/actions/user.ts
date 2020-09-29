import {
  GOOGLE_SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  TOGGLE_NOTIFICATIONS,
  EMAIL_SIGN_IN_START,
  CHECK_USER_SESSION_START,
  CHECK_USER_SESSION_SUCCESS,
  CHECK_USER_SESSION_FAILURE,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  PASSWORD_REQUEST_START,
  PASSWORD_REQUEST_SUCCESS,
  PASSWORD_REQUEST_FAILURE,
  CLEAR_NOTIFICATIONS,
  UPDATE_USER_PROFILE_START,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  PASSWORD_UPDATE_START,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAILURE,
  ADMIN_MODIFY_USER,
  ADMIN_MODIFY_RESET,
  ADMIN_FETCH_USERS,
  ADMIN_REQUEST_ACCESS,
  ADMIN_BAN_OR_UNBAN_USER,
  ADMIN_DELETE_USER,
  ADMIN_GET_ALL_USERS,
  ADMIN_ACTIONS_SUCCESS,
  ADMIN_ACTIONS_FAILURE,
  CONFIRM_EMAIL_FAILURE,
  CONFIRM_EMAIL_START,
  CONFIRM_EMAIL_SUCCESS,
  FILTER_ADMIN_USER_LIST,
  PROCESS_PAYMENTS,
  TOGGLE_LOADING_STATUS,
  UPLOAD_PROFILE_PHOTO,
} from '../Types/user';
import {
  User,
  NewUser,
  UpdatedUser,
  UpdatedPassword,
  Admin,
  PaymentRequest,
} from '../../types';

export function toggleLoadingStatus(status: boolean) {
  return { type: TOGGLE_LOADING_STATUS, payload: { status } };
}

export function googleSignInStart(id_token: string) {
  return {
    type: GOOGLE_SIGN_IN_START,
    payload: { id_token },
  };
}
export function emailSignInStart(email: string, password: string) {
  return {
    type: EMAIL_SIGN_IN_START,
    payload: { email, password },
  };
}

export function signInSuccess(data: { token: string; user: NewUser }) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: { data },
  };
}

export function signInFailure(error: string) {
  return { type: SIGN_IN_FAILURE, payload: { error } };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function toggleNotifications(status: boolean) {
  return { type: TOGGLE_NOTIFICATIONS, payload: { status } };
}

export function checkUserSessionStart(token: string) {
  return { type: CHECK_USER_SESSION_START, payload: { token } };
}
export function checkUserSessionSuccess(timeLimit: number) {
  return { type: CHECK_USER_SESSION_SUCCESS, payload: { timeLimit } };
}
export function checkUserSessionFailure(error: string) {
  return { type: CHECK_USER_SESSION_FAILURE, payload: { error } };
}

export function signUpStart(user: User) {
  return {
    type: SIGN_UP_START,
    payload: { user },
  };
}

export function signUpSuccess(newUser: User) {
  return {
    type: SIGN_UP_SUCCESS,
    payload: { newUser },
  };
}

export function signUpFailure(error: string) {
  return { type: SIGN_UP_FAILURE, payload: { error } };
}

export function passwordRequestStart(email: string) {
  return { type: PASSWORD_REQUEST_START, payload: { email } };
}

export function passwordRequestSuccess(message: string) {
  return { type: PASSWORD_REQUEST_SUCCESS, payload: { message } };
}

export function passwordRequestFailure(error: string) {
  return { type: PASSWORD_REQUEST_FAILURE, payload: { error } };
}

export function clearAllNotifications() {
  return { type: CLEAR_NOTIFICATIONS };
}

export function updateUserProfileStart(user: UpdatedUser) {
  return {
    type: UPDATE_USER_PROFILE_START,
    payload: { user },
  };
}

export function updateUserProfileSuccess(user: NewUser) {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload: { user },
  };
}

export function updateUserProfileFailure(error: string) {
  return {
    type: UPDATE_USER_PROFILE_FAILURE,
    payload: { error },
  };
}

export function passwordUpdateStart(data: UpdatedPassword) {
  return {
    type: PASSWORD_UPDATE_START,
    payload: { data },
  };
}

export function passwordUpdateSuccess() {
  return {
    type: PASSWORD_UPDATE_SUCCESS,
  };
}

export function passwordUpdateFailure(error: string) {
  return { type: PASSWORD_UPDATE_FAILURE, payload: { error } };
}

export function adminModifyUser(user: NewUser | undefined) {
  return {
    type: ADMIN_MODIFY_USER,
    payload: { user },
  };
}

export function adminModifyReset() {
  return {
    type: ADMIN_MODIFY_RESET,
  };
}

export function adminUpdateUserList(users: NewUser[]) {
  return {
    type: ADMIN_FETCH_USERS,
    payload: { users: users },
  };
}

export function adminRequestAccess(data: Admin) {
  return {
    type: ADMIN_REQUEST_ACCESS,
    payload: { data },
  };
}
export function adminBanOrUnbanUser(data: Admin) {
  return {
    type: ADMIN_BAN_OR_UNBAN_USER,
    payload: { data },
  };
}
export function adminDeleteUser(data: Admin) {
  return {
    type: ADMIN_DELETE_USER,
    payload: { data },
  };
}
export function adminGetAllUsers() {
  return {
    type: ADMIN_GET_ALL_USERS,
  };
}
export function adminActionSuccess(message: string) {
  return {
    type: ADMIN_ACTIONS_SUCCESS,
    payload: { message },
  };
}
export function adminActionFailure(error: string) {
  return {
    type: ADMIN_ACTIONS_FAILURE,
    payload: { error },
  };
}

export function filterAdminUserList(searchQuery: string) {
  return {
    type: FILTER_ADMIN_USER_LIST,
    payload: { searchQuery },
  };
}

export function confirmEmailStart(data: Admin) {
  return { type: CONFIRM_EMAIL_START, payload: { data } };
}

export function confirmEmailSuccess(message: string) {
  return {
    type: CONFIRM_EMAIL_SUCCESS,
    payload: { message },
  };
}

export function confirmEmailFailure(error: string) {
  return {
    type: CONFIRM_EMAIL_FAILURE,
    payload: { error },
  };
}

export function processPayments(data: PaymentRequest) {
  return {
    type: PROCESS_PAYMENTS,
    payload: { data },
  };
}
export function uploadProfilePhoto(user: UpdatedUser) {
  return {
    type: UPLOAD_PROFILE_PHOTO,
    payload: { user },
  };
}
