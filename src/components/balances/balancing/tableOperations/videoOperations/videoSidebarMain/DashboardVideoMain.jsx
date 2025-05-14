import React, { useState } from 'react'
import { FaFileVideo, FaPhotoVideo, FaVideo } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'
import ModalVideoMain from './ModalVideoMain';

const DashboardVideoMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
      <div className="flex flex-col gap-2">
            <button onClick={handleOpen} className="mb-4">
              <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
                  <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
                      <FaFileVideo className="text-secondary_two items-center block lg:hidden" size={24} />
                      <FaFileVideo className="text-secondary_two items-center hidden lg:block" size={40} />
                      <span className="py-3 uppercase font-bold">Vídeos</span>
                  </span>
              </span>
            </button>
          

        <ModalVideoMain
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          handleClose={handleClose}
        />

      </div>
  )
}

export default DashboardVideoMain