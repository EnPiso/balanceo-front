import React from 'react'

const PdfBox = ({item}) => {
  return (
    <>
      <div className="flex justify-between items-center mr-2">
        <h3 className="text-gray-800 dark:text-gray-400 mt-2 mb-2 ml-2 mr-2">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300  font-bold mt-2 mb-2 ml-2 mr-2">{item.description}</p>
      </div>
    </>
  )
}
export default PdfBox
