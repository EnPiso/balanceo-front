import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {FaBackward, FaSave} from "react-icons/fa";
import CustomButton from "../../../../ui/CustomButton.jsx";
import React from "react";

export const  ConfirmOpen = ({isOpen, setIsOpen, handleSave, title, description}) => {

  const handleSaveOperator = () => {
    handleSave()
    setIsOpen(false)
  }

  return (
    <>

      <Modal isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <ModalContent>
            <>
              <ModalBody>
                <div className="mt-4 p-4 text-xl text-center rounded-lg">
                  <p> {title} <b>{description}</b> </p>
                  <h1 className="text-4xl mt-3">
                    ⚠️
                  </h1>
                </div>

              </ModalBody>
              <ModalFooter className="flex justify-center">

                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaSave color="green"/>}
                  onClick={handleSaveOperator}
                  title="Sí, Continuar"
                />
                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaBackward />}
                  onClick={() => setIsOpen(false)}
                  title="No, Cancelar"
                />

              </ModalFooter>
            </>

        </ModalContent>
      </Modal>
    </>
  );
}