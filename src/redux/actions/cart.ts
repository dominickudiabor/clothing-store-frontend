import {
  TOGGLE_CART_HIDDEN,
  CartActions,
  ADD_ITEMS_TO_CART,
  REDUCE_CART_QUANTITY,
  REMOVE_ITEM_FROM_CART,
  RESET_CART_STATE,
} from '../Types/cart'
import { Product } from '../../types'

export function toggleCartHidden() {
  return {
    type: TOGGLE_CART_HIDDEN,
  }
}

export function addItemsToCart(product: Product): CartActions {
  return {
    type: ADD_ITEMS_TO_CART,
    payload: { product },
  }
}

export function reduceCartQuantity(product: Product): CartActions {
  return {
    type: REDUCE_CART_QUANTITY,
    payload: { product },
  }
}

export function removeItemFromCart(product: Product): CartActions {
return {
  type: REMOVE_ITEM_FROM_CART,
  payload: {product}
}
}

export function resetCartState(){
  return {
    type:RESET_CART_STATE
  }
}