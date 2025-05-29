
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import CustomButton from "../../ui/CustomButton.jsx";
import {FaBackward, FaPlusCircle, FaWindowClose} from "react-icons/fa";
import ListOpersMaster from "./ListOpersMaster.jsx";
import { useRecoilState } from "recoil";
import { isShowOperMaster } from "../../infraestructure/states/opers_states.js";
import ShowOperMaster from "./ShowOperMaster.jsx";
import TabsOperatorMasterPol from "../polyvalencesTimes/TabsOperatorMasterPol.jsx";
import { MyOperationsPoly, percentZonesOpers, setOperPolyvalence } from "../../infraestructure/states/states_polyvalence.js";


const ModalOpersMaster = ({isOpen, setIsOpen,handleClose,handleOpen}) => {
  // Usa useState para controlar el estado del modal
  const [operMaster, setOperMaster] = useRecoilState(isShowOperMaster)
  
  const [tabState, setTabState] = useState("detalles de los operarios");  

  const [operPoly, setOperPoly] = useRecoilState(setOperPolyvalence)
  const [operationsPoly, setOperationsPoly] = useRecoilState(MyOperationsPoly)
  const [ percentZones, setPercentZones ] = useRecoilState(percentZonesOpers)
  

  return (
    <div className="flex flex-col gap-2">


      <Modal
        placement="center"
        size="5xl"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={(isOpenState) => {
          if (!isOpenState) {
            setOperMaster(null)
            setOperPoly(null)
            setOperationsPoly([])
            setPercentZones(0)
          }
          
          setIsOpen(isOpenState)
        }} // Actualiza el estado
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start items-center">
                Detalles de los operarios

              </ModalHeader>
              <ModalBody>

              <TabsOperatorMasterPol
                operMaster={operMaster}
                tabState={tabState}
                setTabState={setTabState}
              />

              </ModalBody>
              <ModalFooter>

                {
                  operMaster && (
                    <CustomButton
                      color="default"
                      variant="bordered"
                      startContent={<FaBackward />}
                      onClick={()=> setOperMaster(null)}
                      title="Regresar"
                    />
                  )
                }

                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaWindowClose color="red" />}
                  onClick={()=> {
                    setOperMaster(null)
                    handleClose()
                    setPercentZones(0)
                  }}
                  title="Salir"
                />

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalOpersMaster;
