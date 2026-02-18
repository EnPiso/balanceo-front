
import React, { useState } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'
import { ConfirmDeleteOper } from '../../../../opers/ConfirmDeleteOper'
import { Tooltip } from '@nextui-org/react'
import { deleteData, postData, postDataToken } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import toast from 'react-hot-toast'

import { useRecoilState } from 'recoil'
import { openOperaClock, operationsSamples } from '../../../../../infraestructure/states/states_samples'
import { detailOperOperations } from '../../../../../infraestructure/states/states_balancing'
import { tokenMemory } from '../../../../../infraestructure/states/states_views'

const ConfirmDeleteSample = ({sample, index, setSamples, samples}) => {
  const [isDelete, setIsDelete] = useState(false)

  const [isOpenConfirm, setIsOpenConfirm] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples)

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  
  const [operaClock, setOperaClock] = useRecoilState(openOperaClock)
  
  const [token, setToken] = useRecoilState(tokenMemory);
  
  const handleConfirm = (sample) => {
    setIsDelete(true)
    setIsOpenConfirm(true)
  }

  const handleDelete = (sample) => {
   
    const deleteSample = async () => {
          setIsLoading(true)
          try {
            const result = await postDataToken(`${urlMain}samplings/${sample.id}/delete_sample`, token);
            
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
                        

            const detail_id = operaClock.obj.detail_id
          
            // Actualizar el `samplings_count` en el objeto correspondiente
            const updatedDetail = detailOperOpera.map(item => 
              item.detail.id === detail_id
                ? { ...item, detail: { ...item.detail, samplings_count: item.detail.samplings_count - 1 } }
                : item
            );
            
          
            setDetailOperOpera(updatedDetail)
            
          
            setDetailOperOpera(updatedDetail)
            
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
        <button
          onClick={() => handleConfirm(sample)}
          className="flex items-center text-red-500 ml-2"
          title="Eliminar muestra"
        >
          <div className="block lg:hidden">
           <FaDeleteLeft size={40}/>
          </div>
          <div className="hidden lg:block">
            <FaDeleteLeft size={24}/>
          </div>
         
        </button>

      
      {
        isDelete && <ConfirmDeleteOper
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

export default ConfirmDeleteSample