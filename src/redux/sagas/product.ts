import { put, call, takeEvery } from "redux-saga/effects";
import {
  FETCH_SHOP_INVENTORY_START,
  FETCH_SHOP_SECTIONS_START,
} from "../Types/product";
import adminTasks from "../../services/adminTasks";
import {
  toggleLoadingStatus,
  adminActionFailure,
  clearAllNotifications,
} from "../actions/user";
import { fetchSectionData, fetchInventoryData } from "../actions";

//fetchInventoryData(fetchSections.data)

export function* fetchShopSectionsOnStartupAndRehydrate() {
  try {
    const fetchOnLoad = yield call(adminTasks.loadShopSections);
    const response = fetchOnLoad.data;
    yield put(fetchSectionData(response));
    yield put(toggleLoadingStatus(false));
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

export function* fetchShopInventoryOnStartupAndRehydrate() {
  try {
    const fetchOnLoad = yield call(adminTasks.loadShopInventory);
    const response = fetchOnLoad.data;
    yield put(fetchInventoryData(response));
    yield put(toggleLoadingStatus(false));
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
  takeEvery(FETCH_SHOP_SECTIONS_START, fetchShopSectionsOnStartupAndRehydrate),
  takeEvery(
    FETCH_SHOP_INVENTORY_START,
    fetchShopInventoryOnStartupAndRehydrate
  ),
];
