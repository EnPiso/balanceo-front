import {Button} from "@nextui-org/react";
import React, {useState} from "react";
import {AiOutlineUser, AiTwotoneFolderOpen} from "react-icons/ai";
import ModalOperators from "./ModalOperators.jsx";
const DashboardOpers = () => {

  const [isOpen, setIsOpen] = useState(false);


  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleOpen}
        startContent={<AiOutlineUser/>}
        size="5xl"
        className="w-full dark:bg-zinc-900 h-10 font-bold "
        variant="bordered">
        Operarios
      </Button>

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