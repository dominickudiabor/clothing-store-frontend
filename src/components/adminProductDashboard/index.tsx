import React from "react";

import UserInfo from "../user-info";

import SearchBar from "material-ui-search-bar";

import { filterAdminProductList } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { AppState, Product, NewProduct } from "../../types";

import { format } from "date-fns";

import { v4 as uuidv4 } from "uuid";

import "./adminProductDashboard.scss";

const AdminProductDashboard = () => {
  const { filteredProducts, notification } = useSelector(
    (state: AppState) => state.product
  );
  const dispatch = useDispatch();

  const handleChange = (query: string) =>
    dispatch(filterAdminProductList(query));
  const handleCancel = () => dispatch(filterAdminProductList(""));

  const headers = [
    { class: "product-header__select", title: "Select" },
    { class: "product-header__photo", title: "Image" },
    { class: "product-header__name", title: "Name" },
    { class: "product-header__email", title: "product-id" },
    { class: "product-header__price", title: "Price" },
    { class: "product-header__date", title: "Date Created" },
  ];

  return (
    <div className="admin__main">
      <div className="admin__header">Admin Product Dashboard</div>
      <SearchBar
        placeholder={"Search by name"}
        className="admin__search"
        onChange={handleChange}
        onCancelSearch={handleCancel}
      />
      <div className="admin__content">
        <div className="product-header">
          {headers.map((header) => (
            <span key={uuidv4()} className={header.class}>
              {header.title}
            </span>
          ))}
        </div>
        {notification && (
          <div className="admin__filterError">{notification}</div>
        )}
        {filteredProducts.map((product: Product) => {
          const {
            createdAt,
            _id,
            name,
            imageUrl,
            price,
          } = product as NewProduct;
          const formatDate = format(new Date(createdAt), "MM/dd/yyyy");
          return (
            <UserInfo
              key={uuidv4()}
              firstName={name}
              price={price}
              email={_id}
              date={formatDate}
              avatar={imageUrl}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminProductDashboard;
