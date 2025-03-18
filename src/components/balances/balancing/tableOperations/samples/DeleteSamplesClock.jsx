
import React, { useState } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'
import { ConfirmDeleteOper } from '../../../../opers/ConfirmDeleteOper'
import { Tooltip } from '@nextui-org/react'
import { deleteData, postData } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import toast from 'react-hot-toast'
import { ModalConfirmSample } from './ModalConfirmSample'
import { useRecoilState } from 'recoil'
import { openOperaClock, operationsSamples } from '../../../../../infraestructure/states/states_samples'
import { detailOperOperations } from '../../../../../infraestructure/states/states_balancing'

const DeleteSamplesClock = ({sample, index, setSamples, samples, isSample}) => {
  const [isDelete, setIsDelete] = useState(false)

  const [isOpenConfirm, setIsOpenConfirm] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples)

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  
  const [operaClock, setOperaClock] = useRecoilState(openOperaClock)
  
  
  const handleConfirm = (sample) => {
    setIsDelete(true)
    setIsOpenConfirm(true)
  }

  const handleDelete = (sample) => {
    console.log(sample)
   
    const deleteSample = async () => {
          setIsLoading(true)
          try {
            const result = await postData(`${urlMain}samplings/${sample.id}/delete_sample`);
            
            if(result.delete){
              const updateSamples = samples.filter(item => item.id !== sample.id);
              setSamples(updateSamples)
              
              // Actualizar el array de samplesOperations
              setSamplesOperations((prevSamplesOperations) =>
                prevSamplesOperations.map((operation) =>
                  operation.samplings.some((s) => s.id === sample.id)
                    ? {
                        ...operation,
                        samplings: operation.samplings.filter((s) => s.id !== sample.id),
                      }
                    : operation
                )
              );
            }
           const detail_oper_operation_id = isSample.detail_oper_operation_id
            
            // Actualizar el `samplings_count` en el objeto correspondiente
            const updatedDetail = detailOperOpera.map(item => 
              item.detail.id === detail_oper_operation_id
                ? { ...item, detail: { ...item.detail, samplings_count: item.detail.samplings_count - 1 } }
                : item
            );
            
            setDetailOperOpera(updatedDetail)
           
           // setDetailOperOpera(updatedDetail)
           // console.log(detailOperOpera, operaClock)
            
           toast("La muestra ha sida eliminada")
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          } finally {
            setIsLoading(false)
            setIsOpenConfirm(false)
          }
        };
    
    deleteSample();
  }

  return (
    <div>
      <Tooltip content="Eliminar muestra" placement='right'>
        <button
          onClick={() => handleConfirm(sample)}
          className="flex items-center text-red-500 "
          title="Eliminar muestra"
        >
           <div className="block lg:hidden">
              <FaDeleteLeft size={31}/>
            </div>
            <div className="hidden lg:block">
              <FaDeleteLeft size={24}/>
            </div>
                   
        </button>
      </Tooltip>
     
      
      {
        isDelete && <ModalConfirmSample
          isLoading={isLoading}
          isOpen={isOpenConfirm}
          setIsOpen={setIsOpenConfirm}
          handleSave={() => handleDelete(sample)}
          title={`¿Quieres Eliminar?`}
          description={`la muestra de tiempo # ${index}`}
        />
      }
    </div>
  )
}

export default DeleteSamplesClock