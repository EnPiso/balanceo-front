
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
            <ModalHeader className="flex flex-col justify-start items-start gap-3">
              <span className="flex items-center gap-3">
                <img
                  className="w-10 h-10 object-contain"
                  src="/icon/icon.jpeg"
                  alt="Icono de Balance"
                />
                <div className="leading-tight">
                  <p className="text-primary_two font-[900] text-lg m-0">
                    <span className="text-secondary_two">En</span>Piso
                  </p>
                  <p className="text-slate-400 text-sm tracking-wide uppercase">Balanceos</p>
                </div>
              </span>

              <span className="text-lg font-semibold text-zinc-600">
                {tabState}
              </span>
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

