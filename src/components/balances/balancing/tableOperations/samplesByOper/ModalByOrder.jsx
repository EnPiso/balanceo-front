
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
import { isSampleObj, operationsSamples } from "../../../../../infraestructure/states/states_samples";
import ListOperationsSamples from "./ListOperationsSamples";
import DashboardSamplesAutomatic from "../samplesAutomatic/DashboardSamplesAutomatic";
import MyCustomButton from "../../../../../ui/MyCustomButton";



const ModalByOrder = ({isOpen, setIsOpen, oper, isAutomatic, setIsAutomatic}) => {

  const [operSelect, setOperSelect] = useState(null);

  const [isEdit, setIsEdit] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  
  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples)

  const [isSample, setIsSample] = useRecoilState(isSampleObj)
  return (
    <div className="flex flex-col gap-2">

    <Modal
      size="full"
      isOpen={isOpen}
      scrollBehavior={"inside"}
      onOpenChange={(isOpenState) => {
        setIsOpen(isOpenState)
        setIsSample(false)
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
                      <span className="text-secondary_two bg-primary_one ml-2">
                        {oper.name}
                      </span>
                    </h1>

                    <img
                      src={oper.avatar ? oper.avatar : 'https://balance-assets.sfo3.digitaloceanspaces.com/assets/user.webp'}
                      alt={oper.avatar ? oper.avatar : 'https://balance-assets.sfo3.digitaloceanspaces.com/assets/user.webp'}
                      className="w-16 h-16 rounded-full object-cover"
                      style={{
                        border: `6px solid #80B7AE`, // Azul personalizado con 6px de grosor
                      }}
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
                    <MyCustomButton
                        icon={null}
                        title={"Regresar"}
                        handleClick={()=> setIsAutomatic(false)}
                        value={null}
                        bgButton={"bg-zinc-800"}
                        textButton={"text-secondary_two"}
                      />
                    
                  </>
                  
                ) : (
                  <>
                    
                      <MyCustomButton
                        icon={<FaArrowsTurnRight className=" mt-1 mr-3 text-zinc-100"/>}
                        title={"Automatizar operaciones"}
                        handleClick={()=> setIsAutomatic(true)}
                        value={null}
                        bgButton={"bg-zinc-800"}
                        textButton={"text-secondary_two"}
                      />
                  </>
                  
                )
              }
              <MyCustomButton
                icon={<FaBackward className=" mt-1 mr-3 "/>}
                title={"Salir"}
                handleClick={onClose}
                value={null}
                bgButton={"bg-zinc-800"}
                textButton={"text-secondary_two"}
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

