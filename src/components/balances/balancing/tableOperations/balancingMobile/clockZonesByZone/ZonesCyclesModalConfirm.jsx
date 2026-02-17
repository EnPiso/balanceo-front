import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, CircularProgress} from "@nextui-org/react";
import {FaBackward, FaSave} from "react-icons/fa";

import React from "react";
import CustomButton from "../../../../../../ui/CustomButton";
import MyCustomButton from "../../../../../../ui/MyCustomButton";
import { FaDeleteLeft } from "react-icons/fa6";

export const  ZonesCyclesModalConfirm = ({
  isOpen, 
  setIsOpen, 
  handleSave, 
  title, 
  description,
  isLoading
}) => {

  const handleSaveOperator = () => {
    handleSave()
  }

  return (
    <>

      <Modal placement={"center"} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
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
                    <CircularProgress className="mr-2" size="lg" color="default"/> : 
                    <MyCustomButton
                      icon={<FaDeleteLeft className="text-red-500 mr-2" size={24}/>}
                      title={"Sí, Continuar"}
                      handleClick={handleSaveOperator}
                      value={null}
                      bgButton={"bg-zinc-800"}
                      textButton={"text-secondary_two"}
                    />
                }
                

                <MyCustomButton
                  icon={<FaBackward className="mr-2" size={24}/>}
                  title={"No, Cancelar"}
                  handleClick={() => setIsOpen(false)}
                  value={null}
                  bgButton={"text-zinc-800"}
                  textButton={"bg-zinc-200"}
                />
                

              </ModalFooter>
            </>

        </ModalContent>
      </Modal>
    </>
  );
}