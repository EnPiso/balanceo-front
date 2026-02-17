
import {Button} from "@nextui-org/react";
import React, {useState} from "react";
import {AiFillBook, AiFillExperiment, AiOutlineUser, AiTwotoneFolderOpen} from "react-icons/ai";
import ModalOperationMaster from "./ModalOperationMaster";
import { FaChevronRight } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
const OperationsMaster = () => {

  const [isOpen, setIsOpen] = useState(false);


  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <div className="flex flex-col">
        <button onClick={handleOpen} className="w-full">
          <span className="flex items-center justify-between w-full px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100">
            <span className="flex items-center gap-3">
              <FaBoxArchive className="text-slate-500" size={18} />
              <span className="text-sm font-medium">Operaciones</span>
            </span>
            <FaChevronRight className="text-slate-400" size={12} />
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