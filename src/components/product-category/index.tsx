import React from 'react'

import ProductItem from '../product-item/index'

import { v4 as uuidv4 } from 'uuid'

import { useSelector } from 'react-redux'
import { AppState,} from '../../types'
import { useParams } from 'react-router-dom'

import './product-category.scss'

const Category = () => {
  const { categoryName } = useParams()

  const collections = useSelector((state: AppState) => state.product.shopData)

  const { title, items } = collections[categoryName]
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <ProductItem key={uuidv4()} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Category
