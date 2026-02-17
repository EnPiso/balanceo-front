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
import CustomButton from "../../../../../ui/CustomButton";
import MyCustomButton from "../../../../../ui/MyCustomButton";
import { FaDeleteLeft } from "react-icons/fa6";


export const  SamplesGlobalConfirm = ({isOpen, setIsOpen, handleSave, title, description, isLoading}) => {

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
                isLoading ? <Spinner size={"lg"} color={"default"}/> : 
                  <MyCustomButton
                    icon={<FaSave className="mt-1 mr-1 text-red-500"/>}
                    title={"Sí, Continuar"}
                    handleClick={handleSaveOperator}
                    value={"Sí, Continuar"}
                    bgButton={"bg-zinc-800"}
                    textButton={"text-secondary_two"}
                  />
              }

              
              <MyCustomButton
                icon={<FaBackward className="mt-1 mr-1"/>}
                title={"No, Cancelar"}
                handleClick={() => setIsOpen(false)}
                value={"No, Cancelar"}
                bgButton={"bg-zinc-800"}
                textButton={"text-secondary_two"}
              />
             
            </ModalFooter>
          </>

        </ModalContent>
      </Modal>
    </>
  );
}