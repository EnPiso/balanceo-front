
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";

import { FaArrowsTurnRight, FaClock, FaClockRotateLeft } from "react-icons/fa6";
import MyCustomButton from "../../../../../ui/MyCustomButton";
import { clockGlobalModal, samplingsCircleList } from "../../../../../infraestructure/states/states_mobile";
import { useRecoilState } from "recoil";
import SamplesGlobalChrono from "./SamplesGlobalChrono";
import { orderObjBalancing } from "../../../../../infraestructure/states/order_states";


const SamplesGlobalModal = ({isOpen, setIsOpen}) => {

  const [clockGlobal, setClockGlobal]  = useRecoilState(clockGlobalModal)

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  
  const handleOut = () => {
    setClockGlobal(false)
  }

  return (
    <div className="flex flex-col gap-2">

    <Modal
      placement="center"
      size="5xl"
      isOpen={isOpen}
      scrollBehavior={"inside"}
      onOpenChange={(isOpenState) => {
        setIsOpen(isOpenState)
      }} // Actualiza el estado
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between items-center">
              <h1 className="uppercase flex justify-start">
                Ciclos de {objBalancing.product.name}
                <FaClockRotateLeft  className="mt-1 ml-2 text-secondary_two" />   
              </h1>

            </ModalHeader>
            <ModalBody>
              <SamplesGlobalChrono/>
              
            </ModalBody>
            <ModalFooter>

              <MyCustomButton
                icon={""}
                title={"Salir"}
                handleClick={handleOut}
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

export default SamplesGlobalModal

