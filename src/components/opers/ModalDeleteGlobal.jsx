import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner
} from "@nextui-org/react";
import {FaBackward, FaSave} from "react-icons/fa";

import React from "react";
import CustomButton from "../../ui/CustomButton";
import { FaDeleteLeft } from "react-icons/fa6";


export const  ModalDeleteGlobal = ({isOpen, setIsOpen, handleSave, title, description, isLoading}) => {

  const handleDelete = () => {
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
                isLoading ? <Spinner size={"lg"} color={"default"}/> : <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaDeleteLeft color="red"/>}
                  onClick={handleDelete}
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