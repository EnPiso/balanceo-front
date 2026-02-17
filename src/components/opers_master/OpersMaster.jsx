
import {Button} from "@nextui-org/react";
import React, {useState} from "react";
import {AiFillBook, AiFillExperiment, AiOutlineUser, AiTwotoneFolderOpen} from "react-icons/ai";
import { RiFileUserFill } from "react-icons/ri";
import ModalOpersMaster from "./ModalOpersMaster";
import { FaChevronRight } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

const OpersMaster = () => {

  const [isOpen, setIsOpen] = useState(false);


  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <div className="flex flex-col">
      <button onClick={handleOpen} className="w-full">
        <span className="flex items-center justify-between w-full px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100">
          <span className="flex items-center gap-3">
            <FaUserGroup className="text-slate-500" size={18} />
            <span className="text-sm font-medium">Operarios</span>
          </span>
          <FaChevronRight className="text-slate-400" size={12} />
        </span>
      </button>
    
     
      {
        isOpen && 
          <>
            <ModalOpersMaster
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          </>

      }
      
      
    </div>
  )
}

export default OpersMaster;