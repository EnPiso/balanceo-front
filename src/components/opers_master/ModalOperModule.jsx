
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import CustomButton from "../../ui/CustomButton.jsx";
import {FaBackward, FaPlusCircle, FaUser, FaWindowClose} from "react-icons/fa";
import { useRecoilState } from "recoil";
import { masterOpersList, opersListModules } from "../../infraestructure/states/opers_states.js";
import AutocompleteOpersMaster from "./AutocompleteOpersMaster.jsx";



const ModalOperModule = ({isOpen, setIsOpen}) => {
  
  const [opersModules, setOpersModules] = useRecoilState(opersListModules);
  
  
  
  return (
    <div className="flex flex-col gap-2">
      <Modal
        placement="center"
        size="md"
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
                <FaUser className="mt-2 text-secondary_two" size={12}/>
                <span className="text-secondary_two ml-1 capitalize font-bold">
                  {opersModules["oper"]?.name}
                </span>
                
              </ModalHeader>
              <ModalBody>
              
                <AutocompleteOpersMaster
                  setIsOpen={setIsOpen}
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

export default ModalOperModule;
