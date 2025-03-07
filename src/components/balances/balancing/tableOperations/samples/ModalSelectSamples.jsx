
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CircularProgress
} from "@nextui-org/react";

import {FaBackward, FaPlus, FaPlusCircle, FaSave, FaWindowClose} from "react-icons/fa";
import CustomButton from "../../../../../ui/CustomButton";
import DashboardSamples from "./DashboardSamples";
import StepTimeSelector from "../../../../operations_master/StepTimeSelector";
import ListSamples from "./ListSamples";
import { newSamples, stepsSamples } from "../../../../../infraestructure/states/states_samples";
import { useRecoilState } from "recoil";
import { FaClock, FaClockRotateLeft } from "react-icons/fa6";
import { checkOpersPosition } from "../../../../../infraestructure/states/opers_states";
import EditWatchChrono from "../../../../samples/EditWatchChrono";
import { updateData } from "../../../../../infraestructure/call_api/crud";
import { urlMain } from "../../../../../infraestructure/data/const";
import toast from "react-hot-toast";



const ModalSelectSamples = ({isOpen, setIsOpen, Obj, itemAll}) => {

  const [isNewSamples, setIsNewSamples] = useRecoilState(newSamples);
  
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

  const [samples, setSamples] = useRecoilState(stepsSamples)
  

  const [operSelect, setOperSelect] = useState(null);

  const [isEdit, setIsEdit] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(()=> {

    const result = selectedOperDetails.find(item => item.id === Obj.oper_id);
    setOperSelect(result)
  }, [])
  
  const handleUpdateTime = (updatedData) => {
    // console.log(updatedData)
    const data = {
      sampling: {
        sample: updatedData.sample
      }
    }
    const sample_id = updatedData.id
    
    

    const updateSample = async () => {
      setIsLoading(true)
      try {
        const result = await updateData(urlMain + `samplings/${sample_id}`, data)

        const updatedArray = samples.map(item => 
          item.id === result.id ? { ...item, ...result } : item
        );
        setSamples(updatedArray)
        toast.success("la toma de tiempo ha sido actualizada con éxito")
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsEdit(null)
        setIsLoading(false)
      }
    };

    updateSample()

  }

  return (
    <div className="flex flex-col gap-2">

    <Modal
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
            <ModalHeader className="flex justify-start items-center">
              <h1 className="uppercase flex justify-start">
                Muestra de tiempos
                <FaClockRotateLeft  className="mt-1 ml-2" />   
              </h1>
            </ModalHeader>
            <ModalBody>
              <div>
                {
                  itemAll && operSelect && (
                    <>
                      <div className="flex justify-between items-center py-4 bg-zinc-100 px-2 ">
                        <h1 className="text-xl font-bold capitalize">  
                          <span className="text-green-800 ml-2">
                            {itemAll.operation}
                          </span>
                        </h1>

                        <h1 className="text-xl font-bold capitalize"> 
                          <span className="text-green-800 ml-2">
                             { operSelect.name } 
                          </span>
                        </h1>
                       
                      </div>

                      <div className="py-4 bg-zinc-100 px-2 ">
                        <h1 className="text-lg capitalize">  
                          <span className="text-zinc-800 ml-2 bg-zinc-200 px-1 py-1 font-bold rounded">
                            Meta en segundos {" "}
                            {itemAll.sam_seg}
                          </span>
                        </h1>
                      </div>

                    </>
                  )
                }

                {
                  isNewSamples ? (
                    <>
                      <StepTimeSelector Obj={Obj}/>
                      <div className="flex justify-end text-red-700 font-bold ">
                        <button 
                          className="mr-2 flex"
                          onClick={()=> {
                            setIsNewSamples(false)
                          }}
                        >
                          <FaBackward color="red" className="mt-1 mr-1"/>
                          Cancelar
                        </button>
                        
                      </div>
                     
                    </>
                  )  : <div>
                    
                    {
                      isLoading ? (
                        <div className="flex justify-center items-center h-full mt-3 mb-3">
                          <CircularProgress size="lg" color="success" />
                        </div>
                      ) :
                      (
                        <>
                          {isEdit && (
                                <EditWatchChrono 
                                  setIsEdit={setIsEdit}
                                  timeData={isEdit} 
                                  onUpdateTime={handleUpdateTime} />
                            )}
                        
                        </>
                      )
                    }

                    

                    <ListSamples
                      itemAll={itemAll} 
                      setIsEdit={setIsEdit}
                      obj={Obj} isEdit={isEdit} 
                      isLoadingEdit={isLoading}
                    />

                      <div
                        onClick={()=> {
                          setIsNewSamples(true)
                        }}
                        className="flex justify-end text-green-700 font-bold mb-5 text-md mt-4 cursor-pointer">
                        <button 
                          className="mr-1"
                        >
                          Agregar muestras
                        </button>
                        <FaPlus color="green" className="mt-1"/>
                      </div>
                    
                  </div>

                }
              
              </div>
             
              
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

export default ModalSelectSamples

