
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

import {FaBackward, FaPlusCircle, FaWindowClose} from "react-icons/fa";
import CustomButton from "../../ui/CustomButton";
import ListOperationsMaster from "./ListOperationsMaster";
import { showOperationMasterObj } from "../../infraestructure/states/operation_master_state";
import ShowOperationMaster from "./ShowOperationMaster";


const ModalOperationMaster = ({isOpen, setIsOpen,handleClose}) => {

  const [showOperation, setShowOperation] = useRecoilState(showOperationMasterObj)

  

  return (
    <div className="flex flex-col gap-2">

    <Modal
      placement="center"
      size="5xl"
      isOpen={isOpen}
      scrollBehavior={"inside"}
      onOpenChange={(isOpenState) => {
        setIsOpen(isOpenState)
        
        if (!isOpenState) {
          setShowOperation(null)
        }

      }} // Actualiza el estado
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-start items-center">
              {
                showOperation && showOperation.operation ? 
                  showOperation.operation :
                  'Detalle de las operaciones'
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


              {
                showOperation && (
                  <>
                    <CustomButton
                      color="default"
                      variant="bordered"
                      startContent={<FaBackward />}
                      onClick={()=> {
                        setShowOperation(null)
                      }}
                      title="Regresar"
                    />
                  </>
                )
              }

              <CustomButton
                color="default"
                variant="bordered"
                startContent={<FaWindowClose color="red" />}
                onClick={()=> {
                  onClose()
                  setShowOperation(null)
                }}
                title="Salir"
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

