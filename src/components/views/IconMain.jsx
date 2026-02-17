import React from 'react'

const IconMain = () => {
  return (
    <div>
      <img
        className="w-14 h-14 object-contain "
        src="/icon/icon.jpeg"
        alt="Icono de Balance"
      />
      <div className='ml-2 py-1'>
        <p className="text-primary_two font-black text-xl text-start m-0">
          <span>
            <span className="text-secondary_two">En</span>
            <span className="text-primary_two">Piso</span>
          </span>
        </p>
        <p className="text-secondary_two text-xs text-center m-0">BALANCEOS</p>
      </div>
    </div>
  )
}

export default IconMain