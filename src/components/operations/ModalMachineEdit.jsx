import {FaBackward, FaBoxOpen, FaPlusCircle} from "react-icons/fa";
import {Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Tooltip} from "@nextui-org/react";
import React,{useState} from "react";
import CustomButton from "../../ui/CustomButton";
import SelectListEditMachine from "./SelectListEditMachine";



const ModalMachineEdit = ({setIsOpen, isOpen, operation }) => {


  return(
    <>
      <div className="flex flex-col gap-2">


        <Modal
          placement="center"
          size="xl"
          isOpen={isOpen}
          scrollBehavior={"inside"}
          onOpenChange={(isOpenState) => {
            setIsOpen(isOpenState)
          }} // Actualiza el estado
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-start items-center">
                  Cambiar máquina
                </ModalHeader>
                <ModalBody>
                  <SelectListEditMachine
                    operation={operation}
                    setShowMachine={setIsOpen}
                  />
                </ModalBody>
                <ModalFooter>

                  <CustomButton
                    color="default"
                    variant="bordered"
                    startContent={<FaBackward/>}
                    onClick={()=> setIsOpen(false)}
                    title="Regresar"
                  />

                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default ModalMachineEdit;