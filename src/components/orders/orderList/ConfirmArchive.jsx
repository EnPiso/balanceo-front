import React, {useState} from 'react'
import {Modal, ModalBody, ModalContent, ModalFooter, Spinner} from "@nextui-org/react";
import CustomButton from "../../../ui/CustomButton.jsx";
import {FaBackward, FaFileArchive, FaSave} from "react-icons/fa";
import {ConfirmOpen} from "../../balances/balancing/sidebarForm/ConfirmOpers.jsx";

const ConfirmArchive = ({isOpen, setIsOpen, handleSubmit, title, description, isLoading}) => {



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
                isLoading ? <Spinner size="lg"/> : <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaSave color="green"/>}
                  onClick={handleSubmit}
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

  )
}
export default ConfirmArchive
