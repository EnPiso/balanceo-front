import React, { useState } from 'react'
import { FaArrowAltCircleRight, FaCheck, FaClock, FaRegWindowClose, FaSave, FaWindowClose } from 'react-icons/fa'
import WatchChrono from '../../../../samples/WatchChrono'
import CustomButton from '../../../../../ui/CustomButton'
import ListSamplesClock from './ListSamplesClock'
import { postData, updateData } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import toast from 'react-hot-toast'
import EditWatchChrono from '../../../../samples/EditWatchChrono'
import { Spinner, Tooltip } from '@nextui-org/react'
import { FaClosedCaptioning } from 'react-icons/fa6'
import TableSamplesByOper from './TableSamplesByOper'
import { operationsSamples } from '../../../../../infraestructure/states/states_samples'
import { useRecoilState } from 'recoil'
import { detailOperOperations } from '../../../../../infraestructure/states/states_balancing'

const ObjOperationSample = ({sampleOperation, setIsSample, isSample,samplesClock, setSamplesClock}) => {
  const {operation} = sampleOperation

  const [isSampleClock, setIsSampleClock] = useState(false)

  const [isEdit, setIsEdit] = useState(null)

  const [isloadingEdit, setIsloadingEdit] = useState(null)

  const [isLoading, setIsloading] = useState(false)

  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples)
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations)
  

  const handleSample = (sample) => {
    setIsSample(sample)
    setIsSampleClock(true)
    setSamplesClock([])
    
  }

  const handleSaveTime = (time, setIsLoading) => {
    console.log(time)
    const detail_oper_operation_id = sampleOperation.detail_oper_operation_id

    const data = {
      sampling: {
        sample: time,
        detail_oper_operation_id: detail_oper_operation_id
      }
    }

    const createSampling = async () => {

      try {
        const result = await postData(urlMain + "/samplings", data)
        setSamplesClock([...samplesClock, result])
       // console.log(samplesOperations)
        const detail_oper_operation_id = data.sampling.detail_oper_operation_id

        // Actualizar el array de samplesOperations
        setSamplesOperations((prevSamplesOperations) =>
          prevSamplesOperations.map((operation) =>
            operation.detail_oper_operation_id === detail_oper_operation_id
              ? {
                  ...operation,
                  samplings: [...operation.samplings, result],
                }
              : operation
          )
        );

        const operations_balancing_id = sampleOperation.operations_balancing_id

          // Actualizar el `samplings_count` en el objeto correspondiente
          const updatedDetail = detailOperOpera.map(item => 
            item.detail.operations_balancing_id === operations_balancing_id
              ? { ...item, detail: { ...item.detail, samplings_count: item.detail.samplings_count + 1 } }
              : item
          );
          
        
        setDetailOperOpera(updatedDetail)
        
        toast.success("Se ha creado la muestra exitosamente")
      } catch (error) {
        console.error('Error setting data', error);
      } finally{
        setIsLoading(false)
      }
    };

    createSampling();
  };

  const handleUpdateTime = (updatedData) => {
    // console.log(updatedData)
    const data = {
      sampling: {
        sample: updatedData.sample
      }
    }

    const sample_id = updatedData.id
    
    

    const updateSample = async () => {
      setIsloadingEdit(true)
      try {
        const result = await updateData(urlMain + `samplings/${sample_id}`, data)

        const updatedArray = samplesClock.map(item => 
          item.id === result.id ? { ...item, ...result } : item
        );
        setSamplesClock(updatedArray)
        toast.success("la toma de tiempo ha sido actualizada con éxito")
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsEdit(null)
        setIsloadingEdit(false)
      }
    };

    updateSample()


    console.log(data)

  }

  return (
    <div>
   
      <div className={`border rounded-lg p-4  dark:bg-zinc-800 mt-2 mb-1 bg-zinc-100
        ${isSample && operation.id === isSample.operation.id ? "drop-shadow-lg mb-4 mt-4  border-2 border-secondary_two " : ""}`}>
        <div className="flex justify-between items-center">
          {
            isLoading ? (
              <>
                <Spinner size='lg' color='success'/>
              </>
            ) : (
              <>
                <Tooltip content={isSample && operation.id === isSample.operation.id ? "" : "Ver operación"} placement='right'>
                  <button
                    onClick={() => {
                      !(isSample && operation.id === isSample.operation.id) &&
                        handleSample(sampleOperation)
                    }}
                    className={`flex justify-between items-center`}>
                      <div
                        className={`text-md capitalize font-bold
                        ${isSample && operation.id === isSample.operation.id ? ' text-green-700' : ''}`}>
                        {operation.operation} 
                      </div>
                      {
                        isSample && operation.id === isSample.operation.id ? 
                          <FaClock className=' ml-3' color='green'/> :
                          <FaArrowAltCircleRight className=' ml-3 animate-pulse' color='green'/>
                      }
                  </button>
                </Tooltip>

               
                <div className='flex justify-between items-center font-bold'>
                  <Tooltip content={sampleOperation.samplings.length < 1 ? "No hay muestras" : "Muestras tomadas"} >
                    <span className={sampleOperation.samplings.length < 1 ? 'text-red-500' : 'text-green-700'}>
                      <span className="bg-zinc-200 rounded py-1 px-1">
                        {sampleOperation.samplings.length}
                      </span>
                    </span>
                  </Tooltip>
                  
                </div>
               
              </>
            )
          }
         
        </div>

        




        {
          isSample && operation.id === isSample.operation.id ? (
            <>
             <div className="py-3">
              
              {isEdit ? (
                <EditWatchChrono
                  setIsEdit={setIsEdit}
                  timeData={isEdit} 
                  onUpdateTime={handleUpdateTime} />
              ) : (
                <WatchChrono onSaveTime={handleSaveTime} />
              )
            }
             </div>
              <ListSamplesClock 
                isLoading={isLoading}
                setIsloading={setIsloading}
                isloadingEdit={isloadingEdit}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                isSample={isSample}
                isSampleClock={isSampleClock}
                setSamplesClock={setSamplesClock}
                samplesClock={samplesClock}
                sampleOperation={sampleOperation}
                />

            </>
          ) : (
            <div>
              {sampleOperation && sampleOperation.samplings.length >= 1 && (
                <>
                  <TableSamplesByOper
                    samples={sampleOperation.samplings}
                    handleSample={handleSample}
                    sampleOperation={sampleOperation}
                    samSeg={sampleOperation.operation.sam_seg}
                  />
                
                </>
              )}
            </div>
          )
        }
        
           
      </div>

    </div>
  )
}

export default ObjOperationSample