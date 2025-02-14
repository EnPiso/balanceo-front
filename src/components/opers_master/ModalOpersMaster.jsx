
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import CustomButton from "../../ui/CustomButton.jsx";
import {FaBackward, FaPlusCircle, FaWindowClose} from "react-icons/fa";
import ListOpersMaster from "./ListOpersMaster.jsx";
import { useRecoilState } from "recoil";
import { isShowOperMaster } from "../../infraestructure/states/opers_states.js";
import ShowOperMaster from "./ShowOperMaster.jsx";


const ModalOpersMaster = ({isOpen, setIsOpen,handleClose,handleOpen}) => {
  // Usa useState para controlar el estado del modal
    const [operMaster, setOperMaster] = useRecoilState(isShowOperMaster)
  
  return (
    <div className="flex flex-col gap-2">


      <Modal
        size="5xl"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={(isOpenState) => {
          if (!isOpenState) {
            setOperMaster(null)
          }
          setIsOpen(isOpenState)
        }} // Actualiza el estado
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start items-center">
                Detalles de los operarios

              </ModalHeader>
              <ModalBody>
               {
                operMaster ? 
                  <ShowOperMaster/> : 
                  <ListOpersMaster/>
               }
              </ModalBody>
              <ModalFooter>

                {
                  operMaster && (
                    <CustomButton
                      color="default"
                      variant="bordered"
                      startContent={<FaBackward />}
                      onClick={()=> setOperMaster(null)}
                      title="Regresar"
                    />
                  )
                }

                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaWindowClose color="red" />}
                  onClick={()=> {
                    setOperMaster(null)
                    handleClose()
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

export default ModalOpersMaster;
