import React from 'react'

const PdfBox = ({item}) => {
  return (
    <div className="py-3 px-4 text-center">
      <p className="text-xs uppercase font-semibold text-secondary_one tracking-wide">{item.title}</p>
      <p className="text-2xl font-black text-primary_one mt-0.5">{item.description}</p>
    </div>
  )
}
export default PdfBox
