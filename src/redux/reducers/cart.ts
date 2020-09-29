import { CartState } from "../../types";
import {
  CartActions,
  REDUCE_CART_QUANTITY,
  TOGGLE_CART_HIDDEN,
  ADD_ITEMS_TO_CART,
  REMOVE_ITEM_FROM_CART,
  RESET_CART_STATE,
} from "../Types/cart";

export default function cart(
  state: CartState = {
    hidden: false,
    cartItems: [],
  },
  action: CartActions
): CartState {
  switch (action.type) {
  case TOGGLE_CART_HIDDEN: {
    return { ...state, hidden: !state.hidden };
  }

  case ADD_ITEMS_TO_CART: {
    const { product } = action.payload;

    const existingItemsInCart = state.cartItems.find(
      (cartItem) => cartItem._id === product._id
    );
    if (existingItemsInCart) {
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) =>
          cartItem._id === product._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      };
    }

    return {
      ...state,
      cartItems: [...state.cartItems, { ...product, quantity: 1 }],
    };
  }

  case REDUCE_CART_QUANTITY: {
    const { product } = action.payload;

    const existingItemsInCart = state.cartItems.find(
      (cartItem) => cartItem._id === product._id
    );
    if (existingItemsInCart?.quantity === 1)
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== product._id
        ),
      };

    return {
      ...state,
      cartItems: state.cartItems.map((cartItem) =>
        cartItem._id === product._id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ),
    };
  }

  case REMOVE_ITEM_FROM_CART: {
    const { product } = action.payload;
    const newCart = state.cartItems.filter(
      (cartItem) => cartItem._id !== product._id
    );
    return { ...state, cartItems: [...newCart] };
  }

  case RESET_CART_STATE: {
    return {
      ...state,
      cartItems: [],
    };
  }

  default:
    return state;
  }
}
