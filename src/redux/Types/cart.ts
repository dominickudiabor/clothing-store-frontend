import { Product } from "../../types"

//cart actions
export const TOGGLE_CART_HIDDEN = 'TOGGLE_CART_HIDDEN'
export const ADD_ITEMS_TO_CART = 'ADD_ITEMS_TO_CART'
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
export const REDUCE_CART_QUANTITY = 'REDUCE_CART_QUANTITY'
export const RESET_CART_STATE = 'RESET_CART_STATE'

//------------------------------------>

//action types for the cart
export type ToggleCartHidden = {
  type: typeof TOGGLE_CART_HIDDEN
}

export type AddItemsToCart = {
  type: typeof ADD_ITEMS_TO_CART
  payload: {
    product: Product
  }
}
export type RemoveItemFromCart = {
  type: typeof REMOVE_ITEM_FROM_CART
  payload: {
    product: Product
  }
}

export type ReduceCartQuantity = {
  type: typeof REDUCE_CART_QUANTITY
  payload: {
    product: Product
  }
}

export type ResetCartState = {
  type:typeof RESET_CART_STATE
}

//------------------------------------>


//cart actions
export type CartActions =
  | ToggleCartHidden
  | AddItemsToCart
  | ReduceCartQuantity
  |RemoveItemFromCart
  |ResetCartState

//------------------------------------>

