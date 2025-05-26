import React, { useState } from 'react'
import { FaBars, FaParagraph } from 'react-icons/fa';
import ModalPolyvalenceTimes from './ModalPolyvalenceTimes';

export const PolyvalencesDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <div className="flex flex-col gap-2">
        <button onClick={handleOpen} className="mb-4">
          <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
              <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
                  <FaBars className="text-secondary_two items-center block lg:hidden" size={24} />
                  <FaBars className="text-secondary_two items-center hidden lg:block" size={40} />
                  <span className="py-3 uppercase font-bold">Polivalencia</span>
              </span>
          </span>
        </button>
      <ModalPolyvalenceTimes
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </div>
  )
}
