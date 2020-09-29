import { ProductState, ProductData, NewProduct } from "../../types";
import {
  ProductActions,
  FETCH_SECTION_DATA,
  FETCH_INVENTORY_DATA,
  ADMIN_MODIFY_PRODUCT,
  UPDATE_PRODUCT_DATA,
  FILTER_ADMIN_PRODUCT_LIST,
  RESET_PRODUCT_STATE,
  ADMIN_RESET_MODIFICATION,
} from "../Types/product";

export default function product(
  state: ProductState = {
    adminEdit: null,
    sections: [],
    shopData: {},
    adminProductData: [],
    filteredProducts: [],
    notification: null,
  },
  action: ProductActions
): ProductState {
  switch (action.type) {
  case ADMIN_MODIFY_PRODUCT: {
    const { product } = action.payload;
    return {
      ...state,
      adminEdit: product,
    };
  }

  case ADMIN_RESET_MODIFICATION: {
    return {
      ...state,
      adminEdit: null,
    };
  }

  case FETCH_SECTION_DATA: {
    const { data } = action.payload;
    return {
      ...state,
      sections: data,
    };
  }

  case FETCH_INVENTORY_DATA: {
    const { data } = action.payload;
    const normalizedData = data.reduce((acc, item) => {
      return { ...acc, [item["routeName"]]: item };
    }, {}) as ProductData;
    return {
      ...state,
      shopData: normalizedData,
    };
  }

  case UPDATE_PRODUCT_DATA: {
    const { data } = action.payload;
    const collections = data.reduce(
      (acc: any, currentValue: { items: any }) => {
        return [...acc, ...currentValue.items];
      },
      []
    ) as NewProduct[];

    return {
      ...state,
      adminEdit: null,
      adminProductData: collections,
      filteredProducts: collections,
      notification: null,
    };
  }

  case FILTER_ADMIN_PRODUCT_LIST: {
    const { searchQuery } = action.payload;
    if (searchQuery.trim() === "") {
      return {
        ...state,
        filteredProducts: [...state.adminProductData],
        notification: null,
      };
    }

    const filteredQuery = state.adminProductData.filter((product) => {
      const { name } = product;
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    if (filteredQuery.length > 0) {
      return {
        ...state,
        filteredProducts: [...filteredQuery],
        notification: null,
      };
    } else {
      return {
        ...state,
        filteredProducts: [],
        notification: "User Not Found!",
      };
    }
  }

  case RESET_PRODUCT_STATE: {
    return {
      ...state,
      adminEdit: null,
      notification: null,
      adminProductData: [],
      filteredProducts: [],
    };
  }

  default:
    return state;
  }
}
