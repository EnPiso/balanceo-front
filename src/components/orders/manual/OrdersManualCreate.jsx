import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, CircularProgress } from "@nextui-org/react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ListManualOrderSelect from "./ListManualOrderSelect";
import DashboardManualOrder from "./DashboardManualOrder";
import { useRecoilState } from "recoil";
import { newManualObj } from "../../../infraestructure/states/operation_master_state";

const OrdersManualCreate = ({isOpen, setIsOpen}) => {
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

                <span className="flex items-center gap-2">
                  <img
                    className="w-8 h-8"
                    src="https://balance-assets.sfo3.digitaloceanspaces.com/assets/shirt.png"
                    alt="shirt"
                  />
                  <span className="text-md font-semibold text-zinc-600 ">
                    Seleccionar los productos
                  </span>
                </span>
              </ModalHeader>
              
              <ModalBody>
                <div className="mt-2">
                  <DashboardManualOrder
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

export default OrdersManualCreate;