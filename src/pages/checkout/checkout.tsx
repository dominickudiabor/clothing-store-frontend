import React from "react";

import CheckoutItem from "../../components/checkout-item";

import { v4 as uuidv4 } from "uuid";

import { AppState } from "../../types";
import { useSelector, useDispatch } from "react-redux";

import "./checkout.scss";
import StripeCheckoutButton from "../../components/stripe-button";
import { Button } from "@material-ui/core";
import { resetCartState } from "../../redux/actions";

const CheckoutPage = () => {
  const cart = useSelector((state: AppState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const cartTotal = cart.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  );
  const headers = ["Product", "Description", "Quantity", "Price", "Remove"];

  const handleClearCart = () => dispatch(resetCartState());

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        {headers.map((header) => (
          <div className="header-block" key={uuidv4()}>
            <span>{header}</span>
          </div>
        ))}
      </div>
      {cart.map((cartItem) => (
        <CheckoutItem key={uuidv4()} cartItem={cartItem} />
      ))}
      <div className="payment">
        <div className="total">
          TOTAL: <span className="currency">€</span>
          <span> {cartTotal.toFixed(2)}</span>
        </div>
        {cart.length !== 0 && <StripeCheckoutButton price={cartTotal} />}
        {cart.length !== 0 && (
          <Button onClick={handleClearCart} className="clear">
            Clear Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
