//user actions

import { NewUser, UpdatedUser, Admin, PaymentRequest } from '../../types';

export const SIGN_OUT = 'SIGN_OUT';
export const TOGGLE_NOTIFICATIONS = 'TOGGLE_NOTIFICATIONS';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const PROCESS_PAYMENTS = 'PROCESS_PAYMENTS';
export const TOGGLE_LOADING_STATUS = 'TOGGLE_LOADING_STATUS';
export const UPLOAD_PROFILE_PHOTO = 'UPLOAD_PROFILE_PHOTO';

//admin actions
export const ADMIN_MODIFY_USER = 'ADMIN_MODIFY_USER';
export const ADMIN_MODIFY_RESET = 'ADMIN_MODIFY_RESET';
export const ADMIN_FETCH_USERS = 'ADMIN_FETCH_USERS';
export const ADMIN_REQUEST_ACCESS = 'ADMIN_REQUEST_ACCESS';
export const ADMIN_BAN_OR_UNBAN_USER = 'ADMIN_BAN_OR_UNBAN_USER ';
export const ADMIN_DELETE_USER = 'ADMIN_DELETE_USER';
export const ADMIN_GET_ALL_USERS = 'ADMIN_GET_ALL_USERS';
export const ADMIN_ACTIONS_SUCCESS = 'ADMIN_ACTIONS_SUCCESS';
export const ADMIN_ACTIONS_FAILURE = 'ADMIN_ACTIONS_FAILURE';
export const FILTER_ADMIN_USER_LIST = 'FILTER_ADMIN_USER_LIST';

//------------------------------------>
//saga actions

export const GOOGLE_SIGN_IN_START = 'GOOGLE_SIGN_IN_START';
export const EMAIL_SIGN_IN_START = 'EMAIL_SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const PASSWORD_REQUEST_START = 'PASSWORD_REQUEST_START';
export const PASSWORD_REQUEST_SUCCESS = 'PASSWORD_REQUEST_SUCCESS';
export const PASSWORD_REQUEST_FAILURE = 'PASSWORD_REQUEST_FAILURE';
export const CHECK_USER_SESSION_START = 'CHECK_USER_SESSION_START';
export const CHECK_USER_SESSION_SUCCESS = 'CHECK_USER_SESSION_SUCCESS';
export const CHECK_USER_SESSION_FAILURE = 'CHECK_USER_SESSION_FAILURE';
export const UPDATE_USER_PROFILE_START = 'UPDATE_USER_PROFILE_START';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE';
export const PASSWORD_UPDATE_START = 'PASSWORD_UPDATE_START';
export const PASSWORD_UPDATE_SUCCESS = 'PASSWORD_UPDATE_SUCCESS';
export const PASSWORD_UPDATE_FAILURE = 'PASSWORD_UPDATE_FAILURE';
export const CONFIRM_EMAIL_START = 'CONFIRM_EMAIL_START';
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
export const CONFIRM_EMAIL_FAILURE = 'CONFIRM_EMAIL_FAILURE';

//------------------------------------>

//action types for the user

export type ToggleLoadingStatus = {
  type: typeof TOGGLE_LOADING_STATUS;
  payload: { status: boolean };
};
export type GoogleSignInStart = {
  type: typeof GOOGLE_SIGN_IN_START;
  payload: { id_token: string };
};
export type EmailSignInStart = {
  type: typeof EMAIL_SIGN_IN_START;
  payload: { email: string; password: string };
};

export type SignInSucccess = {
  type: typeof SIGN_IN_SUCCESS;
  payload: {
    data: { token: string; user: NewUser };
  };
};

export type SignInFailure = {
  type: typeof SIGN_IN_FAILURE;
  payload: {
    error: string | null;
  };
};

export type SignOut = {
  type: typeof SIGN_OUT;
};

export type ToggleNotifications = {
  type: typeof TOGGLE_NOTIFICATIONS;
  payload: { status: boolean };
};
export type CheckUserSessionStart = {
  type: typeof CHECK_USER_SESSION_START;
  payload: { token: string };
};

export type CheckUserSessionSuccess = {
  type: typeof CHECK_USER_SESSION_SUCCESS;
  payload: { timeLimit: number };
};

export type CheckUserSessionFailure = {
  type: typeof CHECK_USER_SESSION_FAILURE;
  payload: {
    error: string | null;
  };
};

export type SignUpStart = {
  type: typeof SIGN_UP_START;
  payload: {
    user: {
      displayName: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
  };
};
export type SignUpSuccess = {
  type: typeof SIGN_UP_SUCCESS;
  payload: {
    newUser: {
      displayName: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
};

export type SignUpFailure = {
  type: typeof SIGN_UP_FAILURE;
  payload: {
    error: string | null;
  };
};

export type PasswordRequestStart = {
  type: typeof PASSWORD_REQUEST_START;
  payload: {
    email: string;
  };
};

export type PasswordRequestSuccess = {
  type: typeof PASSWORD_REQUEST_SUCCESS;
  payload: {
    message: string;
  };
};
export type PasswordRequestFailure = {
  type: typeof PASSWORD_REQUEST_FAILURE;
  payload: {
    error: string;
  };
};

export type ClearAllNotifications = {
  type: typeof CLEAR_NOTIFICATIONS;
};

export type UpdateUserProfileStart = {
  type: typeof UPDATE_USER_PROFILE_START;
  payload: { user: UpdatedUser };
};

export type UpdateUserProfileSucccess = {
  type: typeof UPDATE_USER_PROFILE_SUCCESS;
  payload: {
    user: NewUser;
  };
};

export type UploadProfilePhoto = {
  type: typeof UPLOAD_PROFILE_PHOTO;
  payload: {
    user: UpdatedUser;
  };
};

export type UpdateUserProfileFailure = {
  type: typeof UPDATE_USER_PROFILE_FAILURE;
  payload: { error: string };
};

export type PasswordUpdateStart = {
  type: typeof PASSWORD_UPDATE_START;
  payload: {
    data: {
      oldPassword: string;
      newPassword: string;
      email: string;
      userId: string | undefined;
    };
  };
};

export type PasswordUpdateSuccess = {
  type: typeof PASSWORD_UPDATE_SUCCESS;
};
export type PasswordUpdateFailure = {
  type: typeof PASSWORD_UPDATE_FAILURE;
  payload: {
    error: string;
  };
};

export type ConfirmEmailStart = {
  type: typeof CONFIRM_EMAIL_START;
  payload: { data: Admin };
};

export type ConfirmEmailSuccess = {
  type: typeof CONFIRM_EMAIL_SUCCESS;
  payload: {
    message: string;
  };
};

export type ConfirmEmailFailure = {
  type: typeof CONFIRM_EMAIL_FAILURE;
  payload: {
    error: string | null;
  };
};

export type ProcessPayments = {
  type: typeof PROCESS_PAYMENTS;
  payload: {
    data: PaymentRequest;
  };
};

//------------------------------------>
//admin actions types

export type AdminModifyUser = {
  type: typeof ADMIN_MODIFY_USER;
  payload: {
    user: NewUser | any;
  };
};

export type AdminModifyReset = {
  type: typeof ADMIN_MODIFY_RESET;
};
export type adminUpdateUserList = {
  type: typeof ADMIN_FETCH_USERS;
  payload: { users: NewUser[] };
};

export type AdminRequestAccess = {
  type: typeof ADMIN_REQUEST_ACCESS;
  payload: { data: Admin };
};
export type adminBanOrUnbanUser = {
  type: typeof ADMIN_BAN_OR_UNBAN_USER;
  payload: { data: Admin };
};
export type AdminDeleteUser = {
  type: typeof ADMIN_DELETE_USER;
  payload: { data: Admin };
};
export type AdminGetAllUsers = {
  type: typeof ADMIN_GET_ALL_USERS;
  payload: { data: Admin };
};

export type AdminActionSuccess = {
  type: typeof ADMIN_ACTIONS_SUCCESS;
  payload: {
    message: string;
  };
};

export type AdminActionFailure = {
  type: typeof ADMIN_ACTIONS_FAILURE;
  payload: {
    error: string | null;
  };
};

export type FilterAdminUserList = {
  type: typeof FILTER_ADMIN_USER_LIST;
  payload: { searchQuery: string };
};

//------------------------------------>
//user actions
export type UserActions =
  | GoogleSignInStart
  | SignInSucccess
  | SignInFailure
  | SignOut
  | ToggleNotifications
  | EmailSignInStart
  | CheckUserSessionStart
  | CheckUserSessionSuccess
  | CheckUserSessionFailure
  | SignUpStart
  | SignUpSuccess
  | SignUpFailure
  | PasswordRequestStart
  | PasswordRequestSuccess
  | PasswordRequestFailure
  | PasswordUpdateStart
  | PasswordUpdateSuccess
  | PasswordUpdateFailure
  | ClearAllNotifications
  | UpdateUserProfileStart
  | UpdateUserProfileSucccess
  | UpdateUserProfileFailure
  | AdminModifyUser
  | AdminModifyReset
  | adminUpdateUserList
  | AdminRequestAccess
  | adminBanOrUnbanUser
  | AdminDeleteUser
  | AdminGetAllUsers
  | AdminActionSuccess
  | AdminActionFailure
  | FilterAdminUserList
  | ConfirmEmailStart
  | ConfirmEmailSuccess
  | ConfirmEmailFailure
  | ProcessPayments
  | ToggleLoadingStatus
  | UploadProfilePhoto;
//------------------------------------>
