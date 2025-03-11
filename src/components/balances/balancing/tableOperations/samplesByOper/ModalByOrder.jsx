
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

import {FaBackward, FaPlayCircle, FaPlus, FaPlusCircle, FaSave, FaWindowClose} from "react-icons/fa";
import CustomButton from "../../../../../ui/CustomButton";

import { FaArrowsTurnRight, FaClock, FaClockRotateLeft } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { operationsSamples } from "../../../../../infraestructure/states/states_samples";
import ListOperationsSamples from "./ListOperationsSamples";
import DashboardSamplesAutomatic from "../samplesAutomatic/DashboardSamplesAutomatic";



const ModalByOrder = ({isOpen, setIsOpen, oper, isAutomatic, setIsAutomatic}) => {

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


                    <div>
                      <div className="flex justify-between items-center mt-3">
                        {
                          !isAutomatic ? 
                            <h1 className="text-left uppercase font-bold text-xl mb-2 ">
                              Operaciones
                            </h1> :
                            <div></div>
                        }
             
                        
                        
                      </div>
                    </div>

                    {
                      isAutomatic ? 
                      <DashboardSamplesAutomatic
                        setIsAutomatic={setIsAutomatic}
                      /> :
                      <ListOperationsSamples/>
                    }
                   
              
              </div>
             
              
            </ModalBody>
            <ModalFooter>

              {
                isAutomatic ? (
                  <>
                
                    <CustomButton
                      color="default"
                      variant="bordered"
                      startContent={<FaBackward color="red" />}
                      onClick={()=> {
                        setIsAutomatic(false)
                      }}
                      title="Regresar"
                    />
                  </>
                  
                ) : (
                  <CustomButton
                      color="default"
                      variant="bordered"
                      startContent={<FaArrowsTurnRight color="green" />}
                      onClick={()=> {
                        setIsAutomatic(true)
                      }}
                      title="Automatizar operaciones"
                    />
                )
              }

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

