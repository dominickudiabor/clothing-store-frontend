import React from 'react'

import CustomButton from '../custom-button/custom-button.component'

import { Product } from '../../types'

import './product-item.scss'
import { useDispatch } from 'react-redux'
import { addItemsToCart } from '../../redux/actions'

interface ItemProps {
  item: Product
}

const ProductItem = ({ item }: ItemProps) => {
  const { name, price, imageUrl } = item
  const dispatch = useDispatch()

  const handleClick = (product: Product) => {
    dispatch(addItemsToCart(product))
  }

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{`€${price}`}</span>
      </div>
      <CustomButton inverted handleClick={() => handleClick(item)}>
        Add to cart
      </CustomButton>
    </div>
  )
}

export default ProductItem
