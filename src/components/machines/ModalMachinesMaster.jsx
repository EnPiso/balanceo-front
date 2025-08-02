
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip
} from "@nextui-org/react";
import {FaBackward, FaPlusCircle, FaQuestionCircle, FaWindowClose} from "react-icons/fa";
import CustomButton from "../../ui/CustomButton";
import ListMachinesMaster from "./ListMachinesMaster";



const ModalMachineMaster = ({isOpen, setIsOpen}) => {
  // Usa useState para controlar el estado del modal

  return (
    <div className="flex flex-col gap-2">


      <Modal
        placement="center"
        size="full"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={(isOpenState) => {
          if (!isOpenState) {
        
          }
          
          setIsOpen(isOpenState)
        }} // Actualiza el estado
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start">
                Detalles de las máquinas
              </ModalHeader>
              <ModalBody>
                <ListMachinesMaster/>
              </ModalBody>
              <ModalFooter>

                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaWindowClose color="red" />}
                  onClick={()=> {
                  
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

export default ModalMachineMaster;
