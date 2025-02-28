import React, { useState } from 'react'
import { FaClock, FaSave, FaWindowClose } from 'react-icons/fa'
import WatchChrono from '../../../../samples/WatchChrono'
import CustomButton from '../../../../../ui/CustomButton'
import ListSamplesClock from './ListSamplesClock'
import { postData, updateData } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import toast from 'react-hot-toast'
import EditWatchChrono from '../../../../samples/EditWatchChrono'

const ObjOperationSample = ({sampleOperation, setIsSample, isSample,samplesClock, setSamplesClock}) => {
  const {operation} = sampleOperation

  const [isSampleClock, setIsSampleClock] = useState(false)

  const [isEdit, setIsEdit] = useState(null)

  const [isloadingEdit, setIsloadingEdit] = useState(null)

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
   
      <div className="border rounded-lg p-4 bg-white dark:bg-zinc-800 mt-1 mb-1">
        <div className="flex justify-start">
          <button
            onClick={() => handleSample(sampleOperation)}
            className={`flex justify-between items-center`}>
              <h3
                className={`text-md capitalize hover:text-green-700
                 ${isSample && operation.id === isSample.operation.id ? 'font-bold text-green-700' : ''}`}>
                {operation.operation}
              </h3>
              <FaClock className=' ml-3'/>
          </button>
        </div>

        {
          isSample && operation.id === isSample.operation.id && (
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
                isloadingEdit={isloadingEdit}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                isSample={isSample}
                isSampleClock={isSampleClock}
                setSamplesClock={setSamplesClock}
                samplesClock={samplesClock}/>

            </>
          )
        }
        

      </div>

    </div>
  )
}

export default ObjOperationSample