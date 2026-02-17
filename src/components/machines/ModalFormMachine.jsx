
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";

import {FaBackward, FaPlusCircle, FaUser, FaWindowClose} from "react-icons/fa";
import { useState } from "react";
import FormOperNewCustom from "../opers_master/new_oper/FormOperNewCustom";
import CustomButton from "../../ui/CustomButton";
import FormNewMachine from "./FormNewMachine";




const ModalFormMachine = ({isOpen, setIsOpen}) => {

  
  return (
    <div className="flex flex-col gap-2">
      <Modal
        placement="center"
        size="md"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={(isOpenState) => {
          setIsOpen(isOpenState)
        }} // Actualiza el estado
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start">

                <span className="text-secondary_two ml-1 capitalize font-bold">
                  Nueva máquina
                </span>  
              </ModalHeader>
              <ModalBody>
                
                <FormNewMachine
                  setIsOpen={setIsOpen}
                />
              </ModalBody>
              <ModalFooter>

                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaWindowClose color="red" />}
                  onClick={()=> {
                    setIsOpen(false)
                  }}
                  title="Salir"
                />

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalFormMachine;
