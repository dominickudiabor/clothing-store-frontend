import { Product, Admin, Section, ProductCategory } from "../../types";
import {
  ProductActions,
  ADD_DATA_TO_DATABASE,
  FETCH_SECTION_DATA,
  FETCH_INVENTORY_DATA,
  ADMIN_MODIFY_PRODUCT,
  ADMIN_FETCH_PRODUCTS,
  UPDATE_PRODUCT_DATA,
  FILTER_ADMIN_PRODUCT_LIST,
  RESET_PRODUCT_STATE,
  ADMIN_CREATE_NEW_PRODUCT,
  ADMIN_DELETE_PRODUCT,
  ADMIN_RESET_MODIFICATION,
  ADMIN_UPDATE_PRODUCT,
  FETCH_SHOP_INVENTORY_START,
  FETCH_SHOP_SECTIONS_START,
} from "../Types/product";

export function adminCreateNewProduct(data: Admin): ProductActions {
  return {
    type: ADMIN_CREATE_NEW_PRODUCT,
    payload: {
      data,
    },
  };
}

export function adminDeleteProduct(data: Admin): ProductActions {
  return {
    type: ADMIN_DELETE_PRODUCT,
    payload: { data },
  };
}

export function adminUpdateProduct(data: Admin): ProductActions {
  return {
    type: ADMIN_UPDATE_PRODUCT,
    payload: { data },
  };
}

export function addProductDataToDatabase(data: Admin): ProductActions {
  return {
    type: ADD_DATA_TO_DATABASE,
    payload: { data },
  };
}

export function fetchSectionData(data: Section[]): ProductActions {
  return {
    type: FETCH_SECTION_DATA,
    payload: { data },
  };
}

export function fetchInventoryData(data: ProductCategory[]): ProductActions {
  return {
    type: FETCH_INVENTORY_DATA,
    payload: { data },
  };
}

export function adminModifyProduct(product: Product | undefined) {
  return {
    type: ADMIN_MODIFY_PRODUCT,
    payload: { product },
  };
}

export function adminResetModification() {
  return {
    type: ADMIN_RESET_MODIFICATION,
  };
}

export function adminFetchProducts() {
  return {
    type: ADMIN_FETCH_PRODUCTS,
  };
}

export function adminUpdateProductListdata(
  data: ProductCategory[]
): ProductActions {
  return {
    type: UPDATE_PRODUCT_DATA,
    payload: { data },
  };
}

export function filterAdminProductList(searchQuery: string): ProductActions {
  return {
    type: FILTER_ADMIN_PRODUCT_LIST,
    payload: { searchQuery },
  };
}

export function resetProductState() {
  return {
    type: RESET_PRODUCT_STATE,
  };
}

export function fetchShopInventoryStart() {
  return {
    type: FETCH_SHOP_INVENTORY_START,
  };
}

export function fetchShopSectionsStart() {
  return {
    type: FETCH_SHOP_SECTIONS_START,
  };
}
