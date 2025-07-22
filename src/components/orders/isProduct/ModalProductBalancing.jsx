import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, CircularProgress } from "@nextui-org/react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { useRecoilState } from "recoil";
import DashboardManualOrder from "../manual/DashboardManualOrder";
import { newManualObj } from "../../../infraestructure/states/operation_master_state";
import DashboardProductBalancing from "./DashboardProductBalancing";


const ModalProductBalancing = ({isOpen, setIsOpen}) => {
  const [newManual, setNewManual] = useRecoilState(newManualObj)
  
  const handleOpen = () => setIsOpen(true); // Abrir el modal
  const handleClose = () => {
    setIsOpen(false)
    cleanObjs()
  }; // Cerrar el modal

  const cleanObjs = () => {
    setNewManual(
      { order: '', 
        products: []
      }
    )
  }

  return (
      <Modal
        placement="center"
        size="full"
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          !open && cleanObjs(); // Limpiar objetos al cerrar el modal
        }} // Sincronizar el estado con el modal
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start uppercase">
                
                <img
                  className="w-8 h-8"
                  src="https://balance-assets.sfo3.digitaloceanspaces.com/assets/shirt.png"
                  alt="shirt"
                /> 
                <span className="mt-1 ml-2">
                  Selecciona el producto
                </span>
              </ModalHeader>
              
              <ModalBody>
                <div className="mt-2">
                  <DashboardProductBalancing
                    setIsOpen={setIsOpen}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex justify-end">
                  {/* Botón para cerrar el modal */}
                  <buttom onClick={handleClose}>
                    <span className="font-bold ">
                      CERRAR
                    </span>
                    
                  </buttom>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
};

export default ModalProductBalancing;