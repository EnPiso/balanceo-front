
import {Button} from "@nextui-org/react";
import React, {useState} from "react";
import {AiFillBook, AiFillExperiment, AiOutlineUser, AiTwotoneFolderOpen} from "react-icons/ai";
import { RiFileUserFill } from "react-icons/ri";
import ModalOpersMaster from "./ModalOpersMaster";

const OpersMaster = () => {

  const [isOpen, setIsOpen] = useState(false);


  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <div className="flex flex-col gap-2">
      <button 
          onClick={handleOpen}
          className="flex justify-center font-bold border-1 border-secondary_two px-1 py-1 rounded-md ">
          <RiFileUserFill className="text-secondary_one mr-2 mt-1" size={20}/>
          <span className="text-secondary_one mt-1">
           Operarios
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