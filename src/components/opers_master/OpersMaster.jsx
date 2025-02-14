
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
      <Button
        onClick={handleOpen}
        startContent={<RiFileUserFill/>}
        size="5xl"
        className="w-full dark:bg-zinc-900 h-10 font-bold "
        variant="bordered">
        Operarios
      </Button>
      
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