import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
  CircularProgress
} from "@nextui-org/react";
import {FaBackward, FaSave} from "react-icons/fa";

import React from "react";



export const  ConfirmDeleteQuestion = ({isOpen, setIsOpen, handleSave, title, description, isLoading}) => {

  const handleSaveOperator = () => {
    handleSave()
    // setIsOpen(false)
  }

  return (
    <>

      <Modal placement="center" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
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
                isLoading ? <CircularProgress size={"lg"} color={"default"}/> :  
                <Button 
                  className="mx-1"
                  color="default"
                    variant="bordered"
                    startContent={<FaSave color="green"/>}
                    onClick={handleSaveOperator}>
                  <span className="font-bold uppercase">
                    Sí, Continuar
                  </span>
                </Button>
              }

              <Button 
                className="mx-1"
                color="default"
                  variant="bordered"
                  startContent={<FaBackward />}
                  onClick={() => setIsOpen(false)}>
                <span className="font-bold uppercase">
                  No, Cancelar
                </span>
              </Button>
             
            </ModalFooter>
          </>

        </ModalContent>
      </Modal>
    </>
  );
}