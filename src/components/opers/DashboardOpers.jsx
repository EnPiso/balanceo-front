import {Button} from "@nextui-org/react";
import React, {useState} from "react";
import {AiOutlineUser, AiTwotoneFolderOpen} from "react-icons/ai";
import ModalOperators from "./ModalOperators.jsx";
import { FaUsers } from "react-icons/fa6";
const DashboardOpers = () => {

  const [isOpen, setIsOpen] = useState(false);


  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <div className="flex flex-col gap-2">
      <button 
          onClick={handleOpen}
          className="flex justify-center font-bold border-1 border-secondary_two px-1 py-1 rounded-md ">
          <FaUsers className="text-secondary_one mr-2 mt-1" size={20}/>
          <span className="text-secondary_one mt-1">
            Plantas y módulos
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