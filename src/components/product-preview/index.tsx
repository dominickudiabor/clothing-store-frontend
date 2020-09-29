import React from 'react'

import { v4 as uuidv4 } from 'uuid'

import ProductItem from '../product-item'

import './product-preview.scss'
import { ProductCategory } from '../../types'
import { Link } from 'react-router-dom'

const ProductPreview = ({ title, items, routeName }: ProductCategory) => (
  <div className="collection-preview">
    <h1 className="title">
      <Link className="link" to={`/shop/${routeName}`}>
        {title.toUpperCase()}
      </Link>
    </h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <ProductItem key={uuidv4()} item={item} />
        ))}
    </div>
  </div>
)

export default ProductPreview
