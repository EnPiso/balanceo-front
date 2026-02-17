import React from 'react'

const TextColorPercent = ({value}) => {
  let color = '';
  
  if (value < 60) {
    color = 'text-red-500';
  } else if (value >= 60 && value < 80) {
    color = 'text-yellow-500';
  } else if (value >= 80 && value <= 100) {
    color = 'text-green-500';
  } else {
    color = 'text-blue-500';
  }

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-bold`}>
      {value}
      <span className={`${color} bg-zinc-100 px-1 py-0.2 rounded-full`}>
        {` % `}
      </span>  
    </span>
  )
}

export default TextColorPercent