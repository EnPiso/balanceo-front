
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
import ListMachinesMaster from "./ListMachinesMaster";



const ModalMachineMaster = ({isOpen, setIsOpen}) => {
  // Usa useState para controlar el estado del modal

  return (
    <div className="flex flex-col gap-2">


      <Modal
        placement="center"
        size="full"
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
                  Detalles de las máquinas
                </span>
              </ModalHeader>
              <ModalBody>
                <ListMachinesMaster/>
              </ModalBody>
              <ModalFooter>

                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaWindowClose color="red" />}
                  onClick={()=> {
                  
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

export default ModalMachineMaster;
