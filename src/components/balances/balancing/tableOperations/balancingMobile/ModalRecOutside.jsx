import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
;
import React, { useState } from "react";

import WebcamAndEditor from "../videoRecCamera/WebcamAndEditor";
import { isOpenModalRec, operationRecVideo } from "../../../../../infraestructure/states/states_videos";
import { useRecoilState } from "recoil";
import { FaX } from "react-icons/fa6";

export const  ModalRecOutside = () => {
  const [isOpen,setIsOpen] = useRecoilState(isOpenModalRec)
  const [operationRec,setOperationRec] = useRecoilState(operationRecVideo)
  
  return (
    <>
      {
        isOpen && (
            <Modal 
              className="bg-primary_one"
              scrollBehavior="inside" 
              size={"full"} 
              placement={"center"} 
              isOpen={isOpen} 
              onOpenChange={(open) => setIsOpen(open)}
              hideCloseButton
              >
              <ModalContent>
                  <>
                    <ModalBody>
                    <div className="absolute top-4 right-0 z-50">
                      <button onClick={() => setIsOpen(false)} className="py-2 px-4 rounded">
                        <FaX size={25} className="text-secondary_two" />
                      </button>
                    </div>
                      <WebcamAndEditor 
                        operation={operationRec}
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