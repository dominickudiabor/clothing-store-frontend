import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  GOOGLE_SIGN_IN_START,
  GoogleSignInStart,
  EMAIL_SIGN_IN_START,
  EmailSignInStart,
  CHECK_USER_SESSION_START,
  CheckUserSessionStart,
  SIGN_UP_START,
  SignUpStart,
  PASSWORD_REQUEST_START,
  PasswordRequestStart,
  UPDATE_USER_PROFILE_START,
  UpdateUserProfileStart,
  PASSWORD_UPDATE_START,
  PasswordUpdateStart,
  ADMIN_REQUEST_ACCESS,
  ADMIN_BAN_OR_UNBAN_USER,
  ADMIN_DELETE_USER,
  ADMIN_GET_ALL_USERS,
  AdminRequestAccess,
  adminBanOrUnbanUser,
  AdminDeleteUser,
  CONFIRM_EMAIL_START,
  ConfirmEmailStart,
  SIGN_OUT,
  PROCESS_PAYMENTS,
  ProcessPayments,
  UPLOAD_PROFILE_PHOTO,
  UploadProfilePhoto,
} from '../Types/user';

import {
  signInSuccess,
  signInFailure,
  checkUserSessionSuccess,
  checkUserSessionFailure,
  checkUserSessionStart,
  signUpFailure,
  emailSignInStart,
  signUpSuccess,
  passwordRequestFailure,
  passwordRequestSuccess,
  clearAllNotifications,
  updateUserProfileFailure,
  updateUserProfileSuccess,
  passwordUpdateFailure,
  passwordUpdateSuccess,
  signOut,
  toggleAdminAccess,
  adminActionSuccess,
  adminActionFailure,
  adminModifyReset,
  adminUpdateUserList,
  confirmEmailSuccess,
  confirmEmailFailure,
  removeHightlight,
  resetProductState,
  resetUiState,
  resetCartState,
} from '../actions';

import { User } from '../../types';
import adminTasks from '../../services/adminTasks';
import userActions from '../../services/userActions';
import authActions from '../../services/authActions';

export function* onEmailSignIn({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const response = yield call(userActions.fetchEmailUser, email, password);
    const emailResponse = response.data;
    yield put(signInSuccess(emailResponse));
    yield put(resetUiState());
    yield put(checkUserSessionStart(emailResponse.token));
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(signInFailure('Cannot connect to network'));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(signInFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}

export function* onGoogleSignIn({ payload: { id_token } }: GoogleSignInStart) {
  try {
    const response = yield call(userActions.fetchGoogleUser, id_token);
    const googleResponse = response.data;
    yield put(signInSuccess(googleResponse));
    yield put(resetUiState());
    yield put(checkUserSessionStart(googleResponse.token));
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(signInFailure('Cannot connect to network'));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(signInFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}

export function* onUserSessionCheck({
  payload: { token },
}: CheckUserSessionStart) {
  try {
    const timeLimit = yield call(userActions.fetchLoginToken, token);
    yield put(checkUserSessionSuccess(timeLimit));
    yield put(clearAllNotifications());
  } catch (error) {
    yield put(checkUserSessionFailure(error));
    yield put(clearAllNotifications());
  }
}

export function* signInUserAfterSignUp({ payload: { user } }: SignUpStart) {
  try {
    const response = yield call(userActions.createUser, user);
    const createdUser: User = response.data;
    yield put(signUpSuccess(createdUser));
    yield put(emailSignInStart(user.email, user.password));
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(signInFailure('Cannot connect to network'));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(signUpFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}

export function* updateUiAfterSuccessfulUpdate({
  payload: { user },
}: UpdateUserProfileStart) {
  try {
    const response = yield call(userActions.updateProfile, user);
    const update = response.data;
    yield put(updateUserProfileSuccess(update));
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(signInFailure('Cannot connect to network'));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(updateUserProfileFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}

export function* uploadProfilePhotoAndUpdateUi({
  payload: { user },
}: UploadProfilePhoto) {
  try {
    const response = yield call(userActions.updateProfilePhoto, user);
    const update = response.data;

    yield put(updateUserProfileSuccess(update.user));
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(signInFailure('Cannot connect to network'));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(updateUserProfileFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}

export function* updatePasswordSignOutAndRelogin({
  payload: { data },
}: PasswordUpdateStart) {
  try {
    yield call(userActions.updatePassword, data);
    yield put(passwordUpdateSuccess());
    yield put(signOut());
    yield put(emailSignInStart(data.email, data.newPassword));
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(signInFailure('Cannot connect to network'));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(passwordUpdateFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}

export function* notififyUserAfterPasswordRequest({
  payload: { email },
}: PasswordRequestStart) {
  try {
    const passwordResponse = yield call(authActions.passwordRequest, email);
    const response = passwordResponse.data;
    yield put(passwordRequestSuccess(response.message));
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(signInFailure('Cannot connect to network'));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(passwordRequestFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}

export function* requestEmailConfirmAndUpdateUI({
  payload: { data },
}: ConfirmEmailStart) {
  try {
    const requestStatus = yield call(userActions.confirmEmail, data);
    const response = requestStatus.data;
    yield put(confirmEmailSuccess(response.message));
    yield put(clearAllNotifications());
    yield put(signOut());
  } catch (error) {
    const errorMessage = error.response.data.message;
    yield put(confirmEmailFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}

export function* checkAdminStatusAndGrantRequest({
  payload: { data },
}: AdminRequestAccess) {
  try {
    const request = yield call(adminTasks.requestAdminAccess, data);

    const response = request.data;
    yield put(toggleAdminAccess(true));
    yield put(adminActionSuccess(response.message));
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(adminActionFailure('Cannot connect to network'));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(adminActionFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}
export function* toggleBanStatus({ payload: { data } }: adminBanOrUnbanUser) {
  try {
    const banRequest = yield call(adminTasks.banOrUnBanUser, data);
    const { data: response, message } = banRequest.data;

    yield put(adminUpdateUserList(response));
    yield put(adminActionSuccess(message));
    yield put(adminModifyReset());
    yield put(removeHightlight());
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(adminModifyReset());
      yield put(adminActionFailure('Cannot connect to network'));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(adminActionFailure(errorMessage));
    yield put(adminModifyReset());
    yield put(clearAllNotifications());
  }
}
export function* eliminateUserFromDatabase({
  payload: { data },
}: AdminDeleteUser) {
  try {
    const deleteRequest = yield call(adminTasks.deleteUser, data);
    const { data: response, message } = deleteRequest.data;

    yield put(adminUpdateUserList(response));
    yield put(adminActionSuccess(message));
    yield put(adminModifyReset());
    yield put(removeHightlight());
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(adminModifyReset());
      yield put(adminActionFailure('Cannot connect to network'));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(adminActionFailure(errorMessage));
    yield put(adminModifyReset());
    yield put(clearAllNotifications());
  }
}
export function* fetchCurrentUsersInDatabase() {
  try {
    const fetchRequest = yield call(adminTasks.getUsers);
    const response = fetchRequest.data;
    yield put(adminUpdateUserList(response));
    yield put(adminModifyReset());
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(adminActionFailure('Cannot connect to network'));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(adminActionFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}

export function* onUserSignOutResetRedux() {
  yield put(resetUiState());
  yield put(resetProductState());
  yield put(resetCartState());
}

export function* processAllPaymentsAndResetCart({
  payload: { data },
}: ProcessPayments) {
  try {
    const paymentRequest = yield call(userActions.processPayments, data);
    const response = paymentRequest.data;
    yield put(adminActionSuccess(response.message));
    yield put(resetCartState());
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(adminActionFailure('Cannot connect to network'));
      yield put(adminModifyReset());
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;

    yield put(adminActionFailure(errorMessage));
    yield put(adminModifyReset());
    yield put(clearAllNotifications());
  }
}

export default [
  takeEvery(GOOGLE_SIGN_IN_START, onGoogleSignIn),
  takeEvery(EMAIL_SIGN_IN_START, onEmailSignIn),
  takeEvery(CHECK_USER_SESSION_START, onUserSessionCheck),
  takeEvery(SIGN_UP_START, signInUserAfterSignUp),
  takeEvery(PASSWORD_REQUEST_START, notififyUserAfterPasswordRequest),
  takeEvery(UPDATE_USER_PROFILE_START, updateUiAfterSuccessfulUpdate),
  takeEvery(PASSWORD_UPDATE_START, updatePasswordSignOutAndRelogin),
  takeLatest(ADMIN_REQUEST_ACCESS, checkAdminStatusAndGrantRequest),
  takeEvery(ADMIN_BAN_OR_UNBAN_USER, toggleBanStatus),
  takeEvery(ADMIN_DELETE_USER, eliminateUserFromDatabase),
  takeEvery(ADMIN_GET_ALL_USERS, fetchCurrentUsersInDatabase),
  takeEvery(CONFIRM_EMAIL_START, requestEmailConfirmAndUpdateUI),
  takeLatest(SIGN_OUT, onUserSignOutResetRedux),
  takeLatest(PROCESS_PAYMENTS, processAllPaymentsAndResetCart),
  takeLatest(UPLOAD_PROFILE_PHOTO, uploadProfilePhotoAndUpdateUi),
];
