import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { processPayments } from "../../redux/actions";
import { AppState } from "../../types";

interface StripeButtonProps {
  price: number;
}

const StripeCheckoutButton = ({ price }: StripeButtonProps) => {
  const dispatch = useDispatch();
  const priceForStripe = price * 100;
  const stripeKey = process.env.REACT_APP_STRIPE_KEY as string;

  const { currentUser, token: authCheck } = useSelector(
    (state: AppState) => state.user
  );

  const handleToken = async (token: Token) => {
    const data = {
      token,
      amount: priceForStripe,
      userId: currentUser?._id,
      authCheck,
    };
    dispatch(processPayments(data));
  };

  return (
    <StripeCheckout
      label="Pay now"
      name="SNEEK Apparel and Sneakers"
      billingAddress
      shippingAddress
      image="https://i.ibb.co/yXm3M3c/logo.png"
      description={`Your total is €${price}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={handleToken}
      stripeKey={stripeKey}
    />
  );
};

export default StripeCheckoutButton;
