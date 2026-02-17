import React from 'react'

const ItemBoxBalancing = ({item}) => {
  return (
    <>
      <div className='text-gray-800 '>
        <h3 className="truncate whitespace-nowrap">
          {item.title}
        </h3>
        <p className="font-bold text-md">{item.description}</p>
      </div>
    </>
  )
}
export default ItemBoxBalancing
