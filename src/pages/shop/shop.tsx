import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import ProductPreview from "../../components/product-preview/index";

import { useSelector, useDispatch } from "react-redux";
import { AppState, ProductCategory } from "../../types";
import {
  toggleLoadingStatus,
  fetchShopInventoryStart,
} from "../../redux/actions";

import "./shop.scss";

const ProductPage = () => {
  const collections = useSelector((state: AppState) => state.product.shopData);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchInventory() {
      dispatch(fetchShopInventoryStart());
      dispatch(toggleLoadingStatus(true));
    }
    !collections.hasOwnProperty("hats") && fetchInventory();
  }, [dispatch, collections]);

  const newCollections = Object.values(collections) as ProductCategory[];
  return (
    <div className="collections-overview">
      {newCollections.map(({ title, items, routeName }) => (
        <ProductPreview
          key={uuidv4()}
          title={title}
          items={items}
          routeName={routeName}
        />
      ))}
    </div>
  );
};

export default ProductPage;
