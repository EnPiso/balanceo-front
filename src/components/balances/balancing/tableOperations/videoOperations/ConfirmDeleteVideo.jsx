
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner} from "@nextui-org/react";
import {FaBackward, FaSave} from "react-icons/fa";

import React from "react";
import CustomButton from "../../../../../ui/CustomButton";
import MyCustomButton from "../../../../../ui/MyCustomButton";

const  ConfirmDeleteVideo = ({isOpen, setIsOpen, handleSave, title, description, isLoading}) => {

  
  const handleSaveOperator = () => {
    handleSave()

  }

  return (
    <>

      <Modal isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} placement="top-center">
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
                    <MyCustomButton
                      icon={ <FaSave className='mt-1 mr-1 text-secondary_two'/>}
                      title={"Sí, Continuar"}
                      handleClick={handleSaveOperator}
                      value={null}
                      bgButton={"bg-primary_one"}
                      textButton={"text-secondary_two"}
                    />
                }

                
                
                <MyCustomButton
                  icon={ <FaBackward className='mt-1 mr-1 '/>}
                  title={"No, Cancelar"}
                  handleClick={()=> setIsOpen(false)}
                  value={null}
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


export default ConfirmDeleteVideo;