
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";

import {FaBackward, FaPlus, FaPlusCircle, FaSave, FaWindowClose} from "react-icons/fa";
import CustomButton from "../../../../../ui/CustomButton";

import { FaClock, FaClockRotateLeft } from "react-icons/fa6";
import DashboardSamplesZones from "./DashboardSamplesZones";
import { useRecoilState } from "recoil";
import { zonesSamplesList } from "../../../../../infraestructure/states/states_samples_zones";


const SamplesZonesModal = ({isOpen, setIsOpen}) => {

  const [zonesSamples, setZonesSamples] = useRecoilState(zonesSamplesList)
   
  return (
    <div className="flex flex-col gap-2">

      <Modal
        placement="center"
        size="5xl"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={(isOpenState) => {
          setIsOpen(isOpenState)
          if (!isOpenState) {
            setZonesSamples([])
          }
        }} // Actualiza el estado
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start items-center">
                <h1 className="uppercase flex justify-start">
                  <span>
                    Tiempos por zona
                  </span>
                  <FaClockRotateLeft  className="mt-1 ml-2" />   
                </h1>
              </ModalHeader>
              <ModalBody>
                <DashboardSamplesZones/>
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

export default SamplesZonesModal

