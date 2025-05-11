
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
import { zoneOperSampleObj, zonesSamplesDetail, zonesSamplesList } from "../../../../../infraestructure/states/states_samples_zones";
import { isLoadingTimeByZone } from "../../../../../infraestructure/states/operation_master_state";
import { zonesMobile } from "../../../../../infraestructure/states/states_mobile";


const SamplesZonesModal = ({isOpen, setIsOpen}) => {

  const [zonesSamples, setZonesSamples] = useRecoilState(zonesSamplesList)
  const [isLoadingByZone, setIsLoadingByZone] = useRecoilState(isLoadingTimeByZone)
  
  const [zoneOperSample, setZoneOperSample] = useRecoilState(zoneOperSampleObj)
    
  const [zonesDetailSample, setZonesDetailSample] = useRecoilState(zonesSamplesDetail)
  
  const [zonesOperUpdate, setZonesOperUpdate] = useRecoilState(zonesMobile);
  
  const resetValues = () => {
    setZoneOperSample(null)
    setZonesSamples([])
    setZonesDetailSample(null)
    setZonesOperUpdate([])
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
          if (!isOpenState) {
            resetValues()
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

