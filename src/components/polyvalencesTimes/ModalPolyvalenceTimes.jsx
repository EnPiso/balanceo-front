
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";

import {FaBackward, FaPlusCircle, FaWindowClose} from "react-icons/fa";
import ListUserPolyvalences from "./ListUserPolyvalences";
import { useRecoilState } from "recoil";
import { MyOperationsPoly, opersZonesPoly, setOperPolyvalence } from "../../infraestructure/states/states_polyvalence";


const ModalPolyvalenceTimes = ({isOpen, setIsOpen,handleClose,handleOpen}) => {
  // Usa useState para controlar el estado del modal
  const [operPoly, setOperPoly] = useRecoilState(setOperPolyvalence)
  const [operationsPoly, setOperationsPoly] = useRecoilState(MyOperationsPoly)
  const [ opersZonesPolyvalence, setOpersZonesPolyvalence ] = useRecoilState(opersZonesPoly)

  return (
    <div className="flex flex-col gap-2">


      <Modal
        placement="center"
        size="5xl"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={(isOpenState) => {
          setIsOpen(isOpenState)
          if(!isOpenState){
            setOperPoly(null)
            setOperationsPoly([])
            setOpersZonesPolyvalence([])
          }
        }} // Actualiza el estado
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start items-center">
                Polivalencia
              </ModalHeader>
              <ModalBody>
                <ListUserPolyvalences/>
              </ModalBody>
              <ModalFooter>

                <button
                  onClick={()=> {
                    handleClose()
                  }}
                >
                  Salir
                </button>
             
               
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalPolyvalenceTimes;
