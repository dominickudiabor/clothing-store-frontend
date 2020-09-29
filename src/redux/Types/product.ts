import { Product, Admin, Section, ProductCategory } from "../../types";

//product actions

export const ADD_DATA_TO_DATABASE = "ADD_DATA_TO_DATABASE ";
export const FETCH_SECTION_DATA = "FETCH_SECTION_DATA";
export const FETCH_INVENTORY_DATA = "FETCH_INVENTORY_DATA";
export const FETCH_SHOP_INVENTORY_START = "FETCH_SHOP_INVENTORY_START ";
export const FETCH_SHOP_SECTIONS_START = "FETCH_SHOP_SECTIONS_START";
export const UPDATE_PRODUCT_DATA = " UPDATE_PRODUCT_DATA";
export const FILTER_ADMIN_PRODUCT_LIST = "FILTER_ADMIN_PRODUCT_LIST";
export const RESET_PRODUCT_STATE = "ESET_PRODUCT_STATE";

//Admin Actions
export const ADMIN_MODIFY_PRODUCT = "ADMIN_MODIFY_PRODUCT,";
export const ADMIN_RESET_MODIFICATION = "ADMIN_RESET_MODIFICATION";
export const ADMIN_FETCH_PRODUCTS = "ADMIN_FETCH_PRODUCTS";
export const ADMIN_CREATE_NEW_PRODUCT = "ADMIN_CREATE_NEW_PRODUCT";
export const ADMIN_DELETE_PRODUCT = "ADMIN_DELETE_PRODUCT";
export const ADMIN_UPDATE_PRODUCT = "ADMIN_UPDATE_PRODUCT";

//------------------------------------>
//action types for product
export type AdminCreateNewProduct = {
  type: typeof ADMIN_CREATE_NEW_PRODUCT;
  payload: {
    data: Admin;
  };
};

export type FetchShopInventoryStart = {
  type: typeof FETCH_SHOP_INVENTORY_START;
};
export type FetchShopSectionsStart = {
  type: typeof FETCH_SHOP_SECTIONS_START;
};

export type AdminDeleteProduct = {
  type: typeof ADMIN_DELETE_PRODUCT;
  payload: { data: Admin };
};

export type addProductDataToDatabase = {
  type: typeof ADD_DATA_TO_DATABASE;
  payload: {
    data: Admin;
  };
};

export type FetchSectionData = {
  type: typeof FETCH_SECTION_DATA;
  payload: {
    data: Section[];
  };
};

export type FetchInventoryData = {
  type: typeof FETCH_INVENTORY_DATA;
  payload: {
    data: ProductCategory[];
  };
};

export type AdminModifyProduct = {
  type: typeof ADMIN_MODIFY_PRODUCT;
  payload: {
    product: Product;
  };
};

export type AdminUpdateProduct = {
  type: typeof ADMIN_UPDATE_PRODUCT;
  payload: {
    data: Admin;
  };
};

export type AdminResetModification = {
  type: typeof ADMIN_RESET_MODIFICATION;
};

export type AdminFetchProducts = {
  type: typeof ADMIN_FETCH_PRODUCTS;
  payload: {
    data: Admin;
  };
};

export type AdminUpdateProductData = {
  type: typeof UPDATE_PRODUCT_DATA;
  payload: {
    data: ProductCategory[];
  };
};

export type FilterAdminProductList = {
  type: typeof FILTER_ADMIN_PRODUCT_LIST;
  payload: { searchQuery: string };
};

export type ResetProductSate = {
  type: typeof RESET_PRODUCT_STATE;
};
//------------------------------------>

//product actions
export type ProductActions =
  | AdminCreateNewProduct
  | addProductDataToDatabase
  | FetchSectionData
  | FetchInventoryData
  | AdminModifyProduct
  | AdminUpdateProductData
  | FilterAdminProductList
  | ResetProductSate
  | AdminResetModification
  | AdminUpdateProduct
  | AdminDeleteProduct
  | FetchShopInventoryStart;
//------------------------------------>
