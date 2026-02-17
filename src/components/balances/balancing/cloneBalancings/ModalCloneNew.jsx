
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CircularProgress,
  Progress
} from "@nextui-org/react";
import {FaBackward, FaPlayCircle, FaPlusCircle, FaUser, FaUsers, FaWindowClose} from "react-icons/fa";
import MyCustomButton from "../../../../ui/MyCustomButton.jsx";
import { useRecoilState } from "recoil";
import { goToUpdateBalance, isShowButtonOpers, openModalOpers } from "../../../../infraestructure/states/states_balancing.js";



const ModalCloneNew = ({isOpen, setIsOpen}) => {
  const [toUpdateBalance, setToUpdateBalance] = useRecoilState(goToUpdateBalance)
  const [isOpenModalOpers, setIsOpenModalOpers] = useRecoilState(openModalOpers)
  const [isShowButton, setIsShowButton] = useRecoilState(isShowButtonOpers)
  
  
  const handleNextOpers = () => {
    setIsOpen(false)
    setIsShowButton(false)
    setTimeout(()=> {
      setIsOpenModalOpers(true)
    }, 500)
  }
  
  return (
    <Modal
      backdrop="blur"
      placement="center"
      size="md"
      isOpen={isOpen}
      scrollBehavior={"inside"}
      onOpenChange={(isOpenState) => {
        // Evitar que el modal se cierre al hacer clic fuera
        if (!isOpenState) return;
        setIsOpen(isOpenState);
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center w-60 h-60">
               
                
    
                <h1 className="py-3 text-center text-lg font-semibold text-secondary_two">
                  {
                    isShowButton ? 
                      'El balanceo ha sido copiado con exito, click en continuar y seleccionar los operarios' :
                      'Por favor, espere un momento mientras copiamos el producto y su orden a un nuevo registro'
                  }  
                </h1>

                {
                  !isShowButton ?
                    <Progress
                      isIndeterminate
                      aria-label="Loading..."
                      classNames={{
                        base: "w-full opacity-50",
                        track: "drop-shadow-md border border-default",
                        indicator: "bg-secondary_two",
                        label: "tracking-wider font-medium text-default-600",
                        value: "text-foreground/60",
                      }}
                      size="sm"
                    /> :
                    <Progress
                      classNames={{
                        base: "max-w-md",
                        track: "drop-shadow-md border border-default",
                        indicator: "bg-secondary_two",
                        label: "tracking-wider font-medium text-default-600",
                        value: "text-foreground/60",
                      }}
                      
                      radius="sm"
                 
                      size="sm"
                      value={100}
                    />
                }
    
               
                {
                  isShowButton && 
                    <MyCustomButton
                      icon={<FaPlayCircle className=" mt-1 mr-3 "/>}
                      title={ "Continuar"} 
                      handleClick={handleNextOpers}
                      value={"Continuar"} 
                      bgButton={"bg-zinc-800"}
                      textButton={"text-secondary_two"}
                    />
                }
                
              </div>
            </div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalCloneNew;
