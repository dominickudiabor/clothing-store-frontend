import React from 'react'
import { useDispatch } from 'react-redux'

import './checkout-item.scss'
import { Product } from '../../types'
import {
  addItemsToCart,
  reduceCartQuantity,
  removeItemFromCart,
} from '../../redux/actions'

interface CheckoutItemProps {
  cartItem: Product
  key: string
}

const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
  const dispatch = useDispatch()
  const increaseCartQuantity = (product: Product) => () =>
    dispatch(addItemsToCart(product))
  const reduceQuantity = (product: Product) => () =>
    dispatch(reduceCartQuantity(product))
  const handleRemoveItem = (product: Product) => () =>
    dispatch(removeItemFromCart(product))

  const { name, imageUrl, price, quantity } = cartItem
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={reduceQuantity(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={increaseCartQuantity(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">€{price}</span>
      <div className="remove-button" onClick={handleRemoveItem(cartItem)}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem
