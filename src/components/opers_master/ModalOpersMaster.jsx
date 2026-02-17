
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip
} from "@nextui-org/react";
import CustomButton from "../../ui/CustomButton.jsx";
import {FaBackward, FaPlusCircle, FaQuestionCircle, FaWindowClose} from "react-icons/fa";
import ListOpersMaster from "./ListOpersMaster.jsx";
import { useRecoilState } from "recoil";
import { isShowOperMaster } from "../../infraestructure/states/opers_states.js";
import ShowOperMaster from "./ShowOperMaster.jsx";
import TabsOperatorMasterPol from "../polyvalencesTimes/TabsOperatorMasterPol.jsx";
import { MyOperationsPoly, percentZonesOpers, setOperPolyvalence } from "../../infraestructure/states/states_polyvalence.js";
import NewButtonOperMaster from "./new_oper/NewButtonOperMaster.jsx";


const ModalOpersMaster = ({isOpen, setIsOpen,handleClose,handleOpen}) => {
  // Usa useState para controlar el estado del modal
  const [operMaster, setOperMaster] = useRecoilState(isShowOperMaster)
  
  const [tabState, setTabState] = useState("");  

  const [operPoly, setOperPoly] = useRecoilState(setOperPolyvalence)
  const [operationsPoly, setOperationsPoly] = useRecoilState(MyOperationsPoly)
  const [ percentZones, setPercentZones ] = useRecoilState(percentZonesOpers)
  
  const [opers, setOpers] = useState([]); 

  return (
    <div className="flex flex-col gap-2">


      <Modal
        placement="center"
        size="full"
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
              <ModalHeader className="flex flex-col justify-start items-start gap-3">
                <span className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 object-contain"
                    src="/icon/icon.jpeg"
                    alt="Icono de Balance"
                  />
                  <div className="leading-tight">
                    <p className="text-primary_two font-[900] text-lg m-0">
                      <span className="text-secondary_two">En</span>Piso
                    </p>
                    <p className="text-slate-400 text-sm tracking-wide uppercase">Balanceos</p>
                  </div>
                </span>

                <span className="text-lg font-semibold text-zinc-600">
                  Detalles de los operarios
                </span>
              </ModalHeader>
              <ModalBody>
                
              <TabsOperatorMasterPol
                operMaster={operMaster}
                tabState={tabState}
                setTabState={setTabState}
                opers={opers}
                setOpers={setOpers}
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
