import { Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'
import { useRecoilState } from 'recoil'
import { zonesSamplesList } from '../../../../../infraestructure/states/states_samples_zones'
import { postData, updateData } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import toast from 'react-hot-toast'
import { SamplesGlobalConfirm } from '../samplesByOper/SamplesGlobalConfirm'

const SamplesZoneDelete = ({sample,index}) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [zonesSamples, setZonesSamples] = useRecoilState(zonesSamplesList)

  const handleDelete = (sample) => {
    const deleteSample = async () => {
      setIsLoading(true)
      try {
        const result = await updateData(`${urlMain}opers_zones/${sample.id}/destroy_sample`);
  
        const updateSamples = zonesSamples.filter(item => item.id !== sample.id);
        
        setZonesSamples(updateSamples)  
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
          onClick={() => setIsOpenConfirm(true)}
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
        isOpenConfirm && 
          <SamplesGlobalConfirm
            isLoading={isLoading}
            isOpen={isOpenConfirm}
            setIsOpen={setIsOpenConfirm}
            handleSave={() => handleDelete(sample)}
            title={`¿Quieres Eliminar?`}
            description={`el ciclo # ${index}`}
          />
      }
    </div>
  )
}

export default SamplesZoneDelete