
import {Button} from "@nextui-org/react";
import React, {useState} from "react";
import {AiFillBook, AiFillExperiment, AiOutlineUser, AiTwotoneFolderOpen} from "react-icons/ai";
import { RiFileUserFill } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";
import ModalOpersMaster from "../opers_master/ModalOpersMaster";
import ModalMachineMaster from "./ModalMachinesMaster";
import { GiSewingMachine } from "react-icons/gi";

const MachinesMaster = () => {

  const [isOpen, setIsOpen] = useState(false);


  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleOpen} className="mb-4">
        <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
            <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
                <GiSewingMachine className="text-secondary_two items-center block lg:hidden" size={24} />
                <GiSewingMachine className="text-secondary_two items-center hidden lg:block" size={40} />
                <span className="py-3 uppercase font-bold">Máquinas</span>
            </span>
        </span>
      </button>
    
      {
        isOpen && 
          <>
            <ModalMachineMaster
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

export default MachinesMaster;