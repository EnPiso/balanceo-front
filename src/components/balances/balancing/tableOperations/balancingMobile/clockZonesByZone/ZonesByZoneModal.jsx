
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  CircularProgress
} from "@nextui-org/react";

import { FaArrowsTurnRight, FaClock, FaClockRotateLeft } from "react-icons/fa6";
import MyCustomButton from "../../../../../../ui/MyCustomButton";
import ZonesByZoneDashboard from "./ZonesByZoneDashboard";


const ZonesByZoneModal = ({isOpen, setIsOpen}) => {

  const handleOut = () => {
    setIsOpen(false)
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
                  Ciclos por zonas
                  <FaClockRotateLeft  className="mt-1 ml-2 text-secondary_two" />   
                </h1>

              </ModalHeader>
              <ModalBody>
                <ZonesByZoneDashboard/>
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

export default ZonesByZoneModal

