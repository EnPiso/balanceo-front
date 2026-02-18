
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
import { isSampleObj, operationsSamples, operByOper } from "../../../../../infraestructure/states/states_samples";
import ListOperationsSamples from "./ListOperationsSamples";
import DashboardSamplesAutomatic from "../samplesAutomatic/DashboardSamplesAutomatic";
import MyCustomButton from "../../../../../ui/MyCustomButton";
import { orderObjBalancing } from "../../../../../infraestructure/states/order_states";
import { fetchGetData, fetchGetDataToken } from "../../../../../infraestructure/call_api/crud";
import { urlMain } from "../../../../../infraestructure/data/const";
import SelectOpersForTimes from "../samplesZones/SelectOpersForTimes";
import { zoneOperSampleObj, zonesSamplesDetail, zonesSamplesList } from "../../../../../infraestructure/states/states_samples_zones";
import { zonesMobile } from "../../../../../infraestructure/states/states_mobile";
import { currentUser, tokenMemory } from "../../../../../infraestructure/states/states_views";



const ModalByOrder = ({isOpen, setIsOpen, oper, isAutomatic, setIsAutomatic}) => {

  const [operSelect, setOperSelect] = useState(null);

  const [isEdit, setIsEdit] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  
  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples)

  const [isSample, setIsSample] = useRecoilState(isSampleObj)
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [selectOperByOper, setSelectOperByOper] = useRecoilState(operByOper);
    
  const [opersBalancingId, setOpersBalancingId] = useState(0);

  const [isShowDetail, setIsShowDetail] = useState(true);

  const [user, setUser] = useRecoilState(currentUser);
  
  const [token, setToken] = useRecoilState(tokenMemory);

  useEffect(()=> {
    oper && setIsShowDetail(false)
  },[])

  const handleSample = (oper) => {
        
    setSelectOperByOper(oper)
    const balancing_id = objBalancing.balancing_id
    const oper_id = oper.id

    const getData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchGetDataToken(`${urlMain}samplings/index_samples_by_oper?balancing_id=${balancing_id}&oper_id=${oper_id}`, token);
        setSamplesOperations(result.operations)
        setIsShowDetail(false)
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
      size="full"
      isOpen={isOpen}
      scrollBehavior={"inside"}
      onOpenChange={(isOpenState) => {
        setIsOpen(isOpenState)
        setIsSample(false)
        if(!isOpenState){
          setSamplesOperations([])
          setIsSample(false)
          setSelectOperByOper(null)
        }
       
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


                <SelectOpersForTimes
                  setOpersBalancingId={setOpersBalancingId}
                  isOnlyOper={true}
                  handleSample={handleSample}
                  isShowDetail={isShowDetail}
                  setIsShowDetail={setIsShowDetail}
                />

                <div className="flex justify-end py-4 bg-zinc-100 px-2 ">
                  <div className="flex justi items-center">
                    {
                      oper && <>
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
                      </> 
                    }
                    
                   
                   
                  </div>
                
                </div>

                        {
                          !isAutomatic && samplesOperations.length >= 1 ? 
                          <div>
                            <div className="flex justify-between items-center mt-3">
                              <h1 className="text-left uppercase font-bold text-xl mb-2 ">
                                Operaciones
                              </h1>
                            </div>
                          </div> :
                            <div></div>
                        }
                    

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
                user && (user.role === 'admin' || user.role === 'supervisor') && 
                  <>
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
                              icon={""}
                              title={"Automatizar operaciones"}
                              handleClick={()=> setIsAutomatic(true)}
                              value={null}
                              bgButton={"bg-zinc-800"}
                              textButton={"text-secondary_two"}
                            />
                        </>
                        
                      )
                    }
                  </>
              }
              
              <MyCustomButton
                icon={""}
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

