
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
import TabsOperationsMaster from "./TabsOperationsMaster";


const ModalOperationMaster = ({isOpen, setIsOpen,handleClose}) => {

  const [showOperation, setShowOperation] = useRecoilState(showOperationMasterObj)

  const [tabState,setTabState] = useState("")

  

  return (
    <div className="flex flex-col gap-2">

    <Modal
      placement="center"
      size="full"
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
                tabState
              }
                
            </ModalHeader>
            <ModalBody>
              <TabsOperationsMaster
                tabState={tabState}
                setTabState={setTabState}
                showOperation={showOperation}
              />
               
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

