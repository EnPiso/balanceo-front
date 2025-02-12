
import React, { useState } from "react";
import {useRecoilState} from "recoil";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio, Tooltip,
} from "@nextui-org/react";

import {FaBackward, FaPlusCircle} from "react-icons/fa";
import CustomButton from "../../ui/CustomButton";
import ListOperationsMaster from "./ListOperationsMaster";
import { showOperationMasterObj } from "../../infraestructure/states/operation_master_state";
import ShowOperationMaster from "./ShowOperationMaster";


const ModalOperationMaster = ({isOpen, setIsOpen,handleClose}) => {

  const [showOperation, setShowOperation] = useRecoilState(showOperationMasterObj)

  return (
    <div className="flex flex-col gap-2">

    <Modal
      size="5xl"
      isOpen={isOpen}
      scrollBehavior={"inside"}
      onOpenChange={(isOpenState) => setIsOpen(isOpenState)} // Actualiza el estado
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-start items-center">
              {
                showOperation && showOperation.operation ? 
                  showOperation.operation :
                  'Operaciones'
              }
                
            </ModalHeader>
            <ModalBody>
              {
                showOperation ? 
                  <ShowOperationMaster/> :
                  <ListOperationsMaster />
              }
                
               
            </ModalBody>
            <ModalFooter>

              <CustomButton
                color="default"
                variant="bordered"
                startContent={<FaBackward />}
                onClick={()=> console.log("Click")}
                title="Regresar"
              />

            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </div>
  )
}

export default ModalOperationMaster

