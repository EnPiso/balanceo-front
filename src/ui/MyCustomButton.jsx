
import React from 'react'

const MyCustomButton = ({icon, title, handleClick, value, bgButton, textButton}) => {
  return (
    <button
      className={`mt-2 font-bold p-2 flex justify-between rounded-xl px-5 ${bgButton} ${textButton}`}
      onClick={() => handleClick(value)}>
      {icon}  {title}
    </button>
  )
}

export default MyCustomButton