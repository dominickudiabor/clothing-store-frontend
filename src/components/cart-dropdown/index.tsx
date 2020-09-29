import React from 'react'

import CustomButton from '../custom-button/custom-button.component'

import DeleteIcon from '@material-ui/icons/Delete'

import { useHistory } from 'react-router-dom'
import {
  removeItemFromCart,
  toggleCartHidden,
} from '../../redux/actions'

import { useDispatch, useSelector } from 'react-redux'


import { Product,AppState } from '../../types'
import { v4 as uuidv4 } from 'uuid'


import './cart-dropdown.scss'

const CartDropdown = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const cart = useSelector((state: AppState) => state.cart.cartItems)

  const handleRemoveItem = (product: Product) => () =>
  { if(cart.length === 1){ dispatch(toggleCartHidden())}
     dispatch(removeItemFromCart(product))}

  const handleCheckout = () => {
   history.push('/checkout') 
    dispatch(toggleCartHidden())
  }
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cart.length ? (
          cart.map((cartItem) => {
            const { imageUrl, quantity, price, name } = cartItem
            return (
              <div key={uuidv4()} className="cart-item">
                <img src={imageUrl} alt="item" />
                <div className="item-details">
                  <span className="name">{name}</span>
                  <span className="price">
                    {quantity}
                
                    <span className= 'multiply'>x</span> €{price}
                  </span>
                </div>
                <DeleteIcon
                  className="delete-icon"
                  onClick={handleRemoveItem(cartItem)}
                />
              </div>
            )
          })
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton handleClick={handleCheckout}>GO TO CHECKOUT</CustomButton>
    </div>
  )
}

export default CartDropdown
