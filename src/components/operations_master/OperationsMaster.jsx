
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
      <Button
        onClick={handleOpen}
        startContent={<AiFillExperiment/>}
        size="5xl"
        className="w-full dark:bg-zinc-900 h-10 font-bold "
        variant="bordered">
        Operaciones
      </Button>
      
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