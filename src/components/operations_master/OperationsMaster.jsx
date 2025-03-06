
import {Button} from "@nextui-org/react";
import React, {useState} from "react";
import {AiFillBook, AiFillExperiment, AiOutlineUser, AiTwotoneFolderOpen} from "react-icons/ai";
import ModalOperationMaster from "./ModalOperationMaster";
const OperationsMaster = () => {

  const [isOpen, setIsOpen] = useState(false);


  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <div className="flex flex-col gap-2">
      <button 
          onClick={handleOpen}
          className="flex justify-center font-bold border-1 border-secondary_two px-1 py-1 rounded-md ">
          <AiFillExperiment className="text-secondary_one mr-2 mt-1" size={20}/>
          <span className="text-secondary_one mt-1">
            Operaciones
          </span>
      </button>
     
      
      {
        isOpen && 
            <ModalOperationMaster
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

      }
      
      
    </div>
  )
}

export default OperationsMaster;