
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
import { isCycleList, zoneCyclesList } from "../../../../../../infraestructure/states/states_samples";
import { orderObjBalancing } from "../../../../../../infraestructure/states/order_states";
import { isLoadingTime } from "../../../../../../infraestructure/states/operation_master_state";
import { useRecoilState } from "recoil";


const ZonesByZoneModal = ({isOpen, setIsOpen}) => {
  const [zonesCycles, setZonesCycles] = useRecoilState(zoneCyclesList);
  const [isLoadingTimeModal, setIsLoadingTimeModal] = useRecoilState(isLoadingTime)
  const [isCycleCreate, setIsCycleCreate] = useRecoilState(isCycleList)

  const handleOut = () => {
    setIsOpen(false)
    handleReset()
  }

  const handleReset = () => { 
    setZonesCycles([])
    setIsLoadingTimeModal(false)
    setIsCycleCreate(false)
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
          !isOpenState && handleReset()
        } 
      } // Actualiza el estado
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center">
                <h1 className="uppercase flex justify-start">
                  Tiempos de las zonas
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

