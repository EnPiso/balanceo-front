
import {Button} from "@nextui-org/react";
import React, {useState} from "react";
import {AiFillBook, AiFillExperiment, AiOutlineUser, AiTwotoneFolderOpen} from "react-icons/ai";
import ModalOperationMaster from "./ModalOperationMaster";
import { FaBoxArchive } from "react-icons/fa6";
const OperationsMaster = () => {

  const [isOpen, setIsOpen] = useState(false);


  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <div className="flex flex-col gap-2">
        <button onClick={handleOpen} className="mb-4">
          <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
              <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
                  <FaBoxArchive className="text-secondary_two items-center block lg:hidden" size={24} />
                  <FaBoxArchive className="text-secondary_two items-center hidden lg:block" size={40} />
                  <span className="py-3 uppercase font-bold">Operaciones</span>
              </span>
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