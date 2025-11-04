import React from 'react'

const ProductTdShow = ({product}) => {
  return (
    <>
      <td className="p-1 border border-gray-300">
          <span>
              {product.name}
          </span>
      </td>
      <td className="p-1 border border-gray-300">
          <span>
              {product.reference}
          </span>
      </td>
      <td className="p-1 border border-gray-300">
          <span>
              {product.category_product_name}
          </span>
      </td>
      
    </>
  )
}

export default ProductTdShow