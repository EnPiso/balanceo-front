import React from 'react'

const ItemBoxBalancing = ({item}) => {
  return (
    <>
      <div className='text-secondary_two '>
        <h3 className=" dark:text-gray-400 truncate whitespace-nowrap">
          {item.title}
        </h3>
        <p className=" dark:text-gray-300  font-bold text-2xl">{item.description}</p>
      </div>
    </>
  )
}
export default ItemBoxBalancing
