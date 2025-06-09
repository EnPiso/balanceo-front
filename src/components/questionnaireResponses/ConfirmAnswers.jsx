import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {FaAdjust, FaBackward, FaRegSave, FaSave} from "react-icons/fa";
import React from "react";
import CustomButton from "../../ui/CustomButton";

export const  ConfirmAnswers = ({isOpen, setIsOpen, handleSave, title, description}) => {

  const handleSaveOperator = () => {
    handleSave()
    setIsOpen(false)
  }

  return (
    <>

      <Modal placement={"center"} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <ModalContent>
            <>
              <ModalBody>
                <div className="mt-4 p-4 text-xl text-center rounded-lg">
                  <p className="text-secondary_two font-bold">{title}</p>
                  <div className="flex justify-center py-3">
                    <FaRegSave size={30}/>
                  </div>
                </div>

              </ModalBody>
              <ModalFooter className="flex justify-center">

                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaSave className="text-secondary_two" size={24}/>}
                  onClick={handleSaveOperator}
                  title="Sí, Guardar"
                />
                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaBackward size={24}/>}
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