import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {FaBackward, FaRecordVinyl, FaSave} from "react-icons/fa";
;
import React, { useState } from "react";
import MyCustomButton from "../../../../../ui/MyCustomButton";
import WebcamAndEditor from "../videoRecCamera/WebcamAndEditor";

export const  ModalRecVideoMobile = ({operation}) => {
  const [isOpen,setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={()=> setIsOpen(true)}
        className="mt-2 ">
        <FaRecordVinyl
          size={45}
          className='text-red-500'
        />
      </button>
      {
        isOpen && (
            <Modal 
              scrollBehavior="inside" 
              size={"full"} 
              placement={"center"} 
              isOpen={isOpen} 
              onOpenChange={(open) => setIsOpen(open)}>
              <ModalContent>
                  <>
                    <ModalBody>
                      <WebcamAndEditor 
                        operation={operation}
                        setIsOpen={setIsOpen}
                      />
                    </ModalBody>
                    
                  </>

              </ModalContent>
            </Modal>
        )
      }
      
    </>
  );
}