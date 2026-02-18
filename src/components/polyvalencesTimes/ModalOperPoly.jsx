
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import CardUnitPol from "./CardUnitPol";
import ImageCardPol from "./ImageCardPol";
import PolyvalenceMachine from "./PolyvalenceMachine";
import { useRecoilState } from "recoil";
import { MyOperationsPoly, opersZonesPoly, percentZonesOpers } from "../../infraestructure/states/states_polyvalence";
import TextColorPercent from "./TextColorPercent";
import { timeToSeconds } from "../../ui/utils";
import { FaClock } from "react-icons/fa6";
import { fetchGetData } from "../../infraestructure/call_api/crud";
import { urlMain } from "../../infraestructure/data/const";
import OpersZonesPolyList from "./OpersZonesPolyList";
import toast from "react-hot-toast";
import ButtonZonePoly from "./ButtonZonePoly";



const ModalOperPoly = ({
  isOpen, 
  setIsOpen,
  handleClose,
  oper, 
  operPoly, 
  allMachines, 
  setMachineSelect, 
  machineSelect, 
  }) => {
  // Usa useState para controlar el estado del modal

  const [ operationsPoly, setOperationsPoly ] = useRecoilState(MyOperationsPoly)
  const [ opersZonesPolyvalence, setOpersZonesPolyvalence ] = useRecoilState(opersZonesPoly)
  
  
  const [ isLoading, setIsLoading ] = useState(false)

  const [ percentZones, setPercentZones ] = useRecoilState(percentZonesOpers)
  

  const handleZone = (oper) => {
    const oper_id = oper.id
    
    const getData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchGetData(`${urlMain}polyvalences_times/opers_zones?oper_id=${oper_id}`);
        
        setOpersZonesPolyvalence(result)
        setPercentZones(result.percent_general)
        
        if(result.opers_zones_by_opers_balancing?.length < 1) {
          toast.error("No hay tiempos en la zona")
          setPercentZones(0)
        }
        
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
      }
    };
    getData();
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
          if(!isOpenState){
            setOpersZonesPolyvalence([])
            setPercentZones(0)
          }
          
        }} // Actualiza el estado
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start items-center">
              
              </ModalHeader>
              <ModalBody>
                <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-4 text-right">
                    <ImageCardPol image={oper.avatar} />
                    <div>
                      <div className={`font-bold text-lg text-secondary_two`}>
                        {oper.name}
                      </div>
                      <div className="text-xs text-zinc-500">cc {oper.id_oper}</div>
                     
                    </div>
                  </div>

                  { operPoly && (oper.id === operPoly.id) && ( allMachines && allMachines.length > 0 ) && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {allMachines.map((machine, idx) => (
                        <PolyvalenceMachine
                          machine={machine}
                          idx={idx}
                          setMachineSelect={setMachineSelect}
                          machineSelect={machineSelect}
                        />
                      ))}
                    </div>
                  )}

                  {
                    operPoly && (oper.id === operPoly.id) && operationsPoly.length >= 1 &&
                      <div className="mt-2 space-y-2">
                        {operationsPoly.map((operation, i) => (
                          <div key={i} className="p-2 bg-gray-50 rounded shadow-sm">
                            <div className="font-semibold text-sm text-gray-700 mb-1">
                              {operation.operation}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {operation.samplings.map((sampling, j) => (
                                <TextColorPercent
                                  total_percent={operation.total_percent}
                                  key={j} 
                                  value={Math.round((operation.sam_seg / timeToSeconds(sampling.sample)) * 100)}/>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                  }
                  
                  <ButtonZonePoly
                    handleZone={handleZone}
                    oper={oper}
                    isLoading={isLoading}
                  />
                  <OpersZonesPolyList/>

                </div>

                
              </ModalBody>
              <ModalFooter>

               
                <button
                  className="font-bold"
                  onClick={()=> {
                    handleClose()
                    setOpersZonesPolyvalence([])
                    setPercentZones(0)
                  }}
                >
                  Regresar
                </button>
               
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalOperPoly;
