
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import {FaBackward, FaPlusCircle, FaUser, FaWindowClose} from "react-icons/fa";
import CustomButton from "../../ui/CustomButton";
import QuestionnairesDashboard from "./QuestionnairesDashboard";





const ModalJoinQuestionnaire = ({isOpen, setIsOpen, operQuestion}) => {
  
  const [opersModules, setOpersModules] = useState([]);
  
  
  
  return (
    <div className="flex flex-col gap-2">
      <Modal
        placement="center"
        size="5xl"
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
                  {operQuestion?.name}
                </span>
                
              </ModalHeader>
              <ModalBody>
                <QuestionnairesDashboard
                  oper={operQuestion}
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

export default ModalJoinQuestionnaire;
