import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import {
  ADD_DATA_TO_DATABASE,
  addProductDataToDatabase,
  ADMIN_FETCH_PRODUCTS,
  ADMIN_CREATE_NEW_PRODUCT,
  AdminCreateNewProduct,
  ADMIN_DELETE_PRODUCT,
  AdminDeleteProduct,
  ADMIN_UPDATE_PRODUCT,
  AdminUpdateProduct,
} from "../Types/product";
import {
  adminActionFailure,
  clearAllNotifications,
  adminActionSuccess,
  adminUpdateProductListdata,
  fetchInventoryData,
  adminResetModification,
  removeHightlight,
  toggleLoadingStatus,
} from "../actions";
import adminTasks from "../../services/adminTasks";

export function* onAdminPopulateDatabaseWithNewData({
  payload: { data },
}: addProductDataToDatabase) {
  try {
    const addMultipleRequest =
      data.requestType === "inventory"
        ? yield call(adminTasks.updateShopInventory, data)
        : yield call(adminTasks.updateSectionInventory, data);
    const response = addMultipleRequest.data;
    yield put(adminActionSuccess(response));
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(adminActionFailure("Cannot connect to network"));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(adminActionFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}
export function* fetchCurrentProductsInDatabase() {
  try {
    const fetchRequest = yield call(adminTasks.getAllProducts);
    const response = fetchRequest.data;
    yield put(toggleLoadingStatus(false));
    yield put(adminUpdateProductListdata(response));
  } catch (error) {
    if (!error.response) {
      yield put(toggleLoadingStatus(false));
      yield put(adminActionFailure("Cannot connect to network"));

      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(toggleLoadingStatus(false));
    yield put(adminActionFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}
export function* createNewProductAndUpdateDatabase({
  payload: { data },
}: AdminCreateNewProduct) {
  try {
    const createRequest = yield call(adminTasks.createNewProduct, data);
    const response = createRequest.data;
    yield put(toggleLoadingStatus(false));
    yield put(adminUpdateProductListdata(response));
    yield put(fetchInventoryData(response));
  } catch (error) {
    if (!error.response) {
      yield put(toggleLoadingStatus(false));
      yield put(adminActionFailure("Cannot connect to network"));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(toggleLoadingStatus(false));
    yield put(adminActionFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}

export function* deleteProductAndUpdateUi({
  payload: { data },
}: AdminDeleteProduct) {
  try {
    const deleteRequest = yield call(adminTasks.deleteProduct, data);
    const response = deleteRequest.data;
    yield put(toggleLoadingStatus(false));
    yield put(adminUpdateProductListdata(response));
    yield put(adminResetModification());
    yield put(removeHightlight());
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(toggleLoadingStatus(false));
      yield put(adminActionFailure("Cannot connect to network"));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(toggleLoadingStatus(false));
    yield put(adminActionFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}

export function* updateProductAndUpdateUi({
  payload: { data },
}: AdminUpdateProduct) {
  try {
    const updateRequest = yield call(adminTasks.updateProduct, data);
    const response = updateRequest.data;
    yield put(toggleLoadingStatus(false));
    yield put(adminUpdateProductListdata(response));
    yield put(adminResetModification());
    yield put(removeHightlight());
    yield put(clearAllNotifications());
  } catch (error) {
    if (!error.response) {
      yield put(toggleLoadingStatus(false));
      yield put(adminActionFailure("Cannot connect to network"));
      return yield put(clearAllNotifications());
    }
    const errorMessage = error.response.data.message;
    yield put(toggleLoadingStatus(false));
    yield put(adminActionFailure(errorMessage));
    yield put(clearAllNotifications());
  }
}

export default [
  takeEvery(ADD_DATA_TO_DATABASE, onAdminPopulateDatabaseWithNewData),
  takeEvery(ADMIN_FETCH_PRODUCTS, fetchCurrentProductsInDatabase),
  takeLatest(ADMIN_CREATE_NEW_PRODUCT, createNewProductAndUpdateDatabase),
  takeEvery(ADMIN_DELETE_PRODUCT, deleteProductAndUpdateUi),
  takeEvery(ADMIN_UPDATE_PRODUCT, updateProductAndUpdateUi),
];
