import { all } from "redux-saga/effects";

import userSagas from "./user";
import adminSagas from "./admin";
import productSagas from "./product";

export default function* rootSaga() {
  yield all([...userSagas, ...adminSagas, ...productSagas]);
}
