import {Button} from "@nextui-org/react";
import React, {useState} from "react";
import {AiOutlineUser, AiTwotoneFolderOpen} from "react-icons/ai";
import ModalOperators from "./ModalOperators.jsx";
import { FaUser, FaUsers } from "react-icons/fa6";
const DashboardOpers = () => {

  const [isOpen, setIsOpen] = useState(false);


  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleOpen} className="mb-4">
        <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
            <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
                <FaUser className="text-secondary_two items-center block lg:hidden" size={24} />
                <FaUser className="text-secondary_two items-center hidden lg:block" size={40} />
                <span className="py-3 uppercase font-bold">Plantas y módulos</span>
            </span>
        </span>
        
      </button>
      
     

      {
        isOpen && <ModalOperators
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
      }

    </div>
  )
}

export default DashboardOpers;