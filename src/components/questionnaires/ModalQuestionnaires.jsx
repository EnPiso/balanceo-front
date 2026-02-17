
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
import ListQuestionnaires from "./ListQuestionnaires";


const ModalQuestionnaires = ({isOpen, setIsOpen}) => {
  // Usa useState para controlar el estado del modal

  

  return (
    <div className="flex flex-col gap-2">

      <Modal
        placement="center"
        size="2xl"
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
                Cuestionarios
              </ModalHeader>
              <ModalBody>
                <ListQuestionnaires/>
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

export default ModalQuestionnaires;
