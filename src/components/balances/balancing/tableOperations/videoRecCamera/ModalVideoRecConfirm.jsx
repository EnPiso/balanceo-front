import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {FaBackward, FaRecordVinyl, FaSave} from "react-icons/fa";
;
import React from "react";
import CustomButton from "../../../../../ui/CustomButton";
import MyCustomButton from "../../../../../ui/MyCustomButton";

export const  ModalVideoRecConfirm = ({isOpen, setIsOpen, handleSave, title, description}) => {

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
                  <p> {title} <b>{description}</b> </p>
                  <h1 className="text-4xl mt-3">
                    ⚠️
                  </h1>
                </div>

              </ModalBody>
              <ModalFooter className="flex justify-center">
                <MyCustomButton
                  icon={<FaRecordVinyl className="text-red-500 mt-1 mr-3"/>}
                  title={"sí, Volver a grabar"} 
                  handleClick={handleSaveOperator}
                  value={"sí, Volver a grabar"} 
                  bgButton={"bg-zinc-800"}
                  textButton={"text-secondary_two"}
                />

                <MyCustomButton
                  icon={<FaBackward className=" mt-1 mr-3 "/>}
                  title={ "Cancelar"} 
                  handleClick={() => setIsOpen(false)}
                  value={"Cancelar"} 
                  bgButton={"bg-zinc-100"}
                  textButton={"text-zinc-800"}
                />
                
               

              </ModalFooter>
            </>

        </ModalContent>
      </Modal>
    </>
  );
}