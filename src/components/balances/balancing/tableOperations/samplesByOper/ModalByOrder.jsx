
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CircularProgress,
  Avatar
} from "@nextui-org/react";

import {FaBackward, FaPlus, FaPlusCircle, FaSave, FaWindowClose} from "react-icons/fa";
import CustomButton from "../../../../../ui/CustomButton";

import { FaClock, FaClockRotateLeft } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { operationsSamples } from "../../../../../infraestructure/states/states_samples";
import ListOperationsSamples from "./ListOperationsSamples";



const ModalByOrder = ({isOpen, setIsOpen, oper}) => {

  const [operSelect, setOperSelect] = useState(null);

  const [isEdit, setIsEdit] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  
  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples)



  return (
    <div className="flex flex-col gap-2">

    <Modal
      size="full"
      isOpen={isOpen}
      scrollBehavior={"inside"}
      onOpenChange={(isOpenState) => {
        setIsOpen(isOpenState)
        
      }} // Actualiza el estado
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-start items-center">
              <h1 className="uppercase flex justify-start">
                Tiempos en las operaciones
                <FaClockRotateLeft  className="mt-1 ml-2" />   
              </h1>
            </ModalHeader>
            <ModalBody>
              <div>

                <div className="flex justify-end py-4 bg-zinc-100 px-2 ">
                  <div className="flex justi items-center">
                    <h1 className="text-xl font-bold uppercase mr-3">  
                      <span className="text-green-800 ml-2">
                        {oper.name}
                      </span>
                    </h1>
                    <Avatar
                      isBordered 
                      color="success"
                      className="w-16 h-16 text-large"
                      src={oper.avatar}
                    />
                  </div>
                
                </div>


                   <ListOperationsSamples/>
                   

              

                      <div
                        onClick={()=> {
                          
                        }}
                        className="flex justify-end text-green-700 font-bold mb-5 text-md mt-4 cursor-pointer">
                        <button 
                          className="mr-1"
                        >
                          Agregar muestras
                        </button>
                        <FaPlus color="green" className="mt-1"/>
                      </div>
                    
   
              
              </div>
             
              
            </ModalBody>
            <ModalFooter>



              <CustomButton
                color="default"
                variant="bordered"
                startContent={<FaWindowClose color="red" />}
                onClick={()=> {
                  onClose()
                }}
                title="Salir"
              />

              
              

            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </div>
  )
}

export default ModalByOrder

