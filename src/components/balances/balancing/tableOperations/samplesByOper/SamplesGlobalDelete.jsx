import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { samplingsCircleList, samplingsCircleObj } from '../../../../../infraestructure/states/states_mobile';
import { FaDeleteLeft } from 'react-icons/fa6';
import { updateData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import toast from 'react-hot-toast';
import { ModalConfirmSample } from '../samples/ModalConfirmSample';
import { SamplesGlobalConfirm } from './SamplesGlobalConfirm';
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { selectOpers } from '../../../../../infraestructure/states/opers_states';
import { samplesGlobalShared } from '../../../../../infraestructure/utils/samplesGlobal';

const SamplesGlobalDelete = ({sampling, index}) => {
  const [samplingsCircle, setSamplingsCircle] = useRecoilState(samplingsCircleList);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [samplingsGlobal, setSamplingsGlobal] = useRecoilState(samplingsCircleObj)
  const [opersSelect] = useRecoilState(selectOpers);

  const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const handleDelete = (sampling) => {

    const data = {
      samplings_cycle :{
        id: sampling.id
      }
    }

    const updateSamplingCircle = async () => {
      setIsLoading(true)
      try {
        const result = await updateData(urlMain + `samplings_cycles`, data)
        // Eliminar el objeto del array local

        setSamplingsCircle(prev => [...prev.filter(item => item.id !== result.id_destroy)]);
        // samplingsCircle
        const updateSamplings = [...samplingsCircle.filter(item => item.id !== result.id_destroy)];
        
        const objUpdate = samplesGlobalShared(updateSamplings, opersSelect, objBalancing.total_sam)
        setSamplingsGlobal(objUpdate)
        

        toast("Se ha eliminado la muestra de tiempo correctamente")
        // guardar imagen de la tabla del balanceo en product
        setIsOpenConfirm(false)
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false)
      }
    };
    
    updateSamplingCircle()
  }
  
  return (
    <div>
      <span className="flex justify-end">
        <button onClick={()=> setIsOpenConfirm(true)}>
          <FaDeleteLeft
              size={35}
              className="text-red-500"
            />
        </button>
      </span>
      {
        isOpenConfirm && 
          <SamplesGlobalConfirm
            isLoading={isLoading}
            isOpen={isOpenConfirm}
            setIsOpen={setIsOpenConfirm}
            handleSave={() => handleDelete(sampling)}
            title={`¿Quieres Eliminar?`}
            description={`el ciclo # ${index}`}
          />
      }
      
      
    </div>
    
  )
}

export default SamplesGlobalDelete