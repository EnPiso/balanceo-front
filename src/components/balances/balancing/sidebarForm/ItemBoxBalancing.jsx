import React from 'react'

const ItemBoxBalancing = ({item}) => {
  return (
    <>
      <div>
        <h3 className="text-gray-800 dark:text-gray-400 truncate whitespace-nowrap">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300  font-bold">{item.description}</p>
      </div>
    </>
  )
}
export default ItemBoxBalancing
