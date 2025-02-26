
import React, { useState } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'
import { ConfirmDeleteOper } from '../../../../opers/ConfirmDeleteOper'
import { Tooltip } from '@nextui-org/react'
import { deleteData, postData } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import toast from 'react-hot-toast'
import { ModalConfirmSample } from './ModalConfirmSample'

const ConfirmDeleteSample = ({sample, index, setSamples, samples}) => {
  const [isDelete, setIsDelete] = useState(false)

  const [isOpenConfirm, setIsOpenConfirm] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  
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
            }
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
          className="flex items-center text-red-500 ml-2"
          title="Eliminar muestra"
        >
          <FaDeleteLeft size={20}/>
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

export default ConfirmDeleteSample