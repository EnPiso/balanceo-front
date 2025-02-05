
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner} from "@nextui-org/react";
import {FaBackward, FaSave} from "react-icons/fa";

import React from "react";
import CustomButton from "../../../../../ui/CustomButton";

const  ConfirmDeleteVideo = ({isOpen, setIsOpen, handleSave, title, description, isLoading}) => {

  
  const handleSaveOperator = () => {
    handleSave()

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

                {
                  isLoading ? 
                    <Spinner size="lg" color="default"/> :
                    <CustomButton
                      color="default"
                      variant="bordered"
                      startContent={<FaSave color="green"/>}
                      onClick={handleSaveOperator}
                      title="Sí, Continuar"
                    />
                }
                
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


export default ConfirmDeleteVideo;