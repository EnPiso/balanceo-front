import React, { useState } from 'react'
import { fetchGetData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import { Spinner } from '@nextui-org/react';
import ModalByOrder from './ModalByOrder';
import { useRecoilState } from 'recoil';
import { operationsSamples } from '../../../../../infraestructure/states/states_samples';

const ButtonSamplesByOper = ({oper,objBalancing}) => {

  const [isLoading, setIsLoading] = useState(false)

  const [showModal, setIsShowModal] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples)

  


  const handleSample = (oper) => {
   
    const balancing_id = objBalancing.balancing_id
    const oper_id = oper.id

    const getData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchGetData(`${urlMain}samplings/index_samples_by_oper?balancing_id=${balancing_id}&oper_id=${oper_id}`);
        console.log(result,oper)
        setSamplesOperations(result.operations)
        setIsShowModal(true)
        setIsOpen(true)

      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
        
      }
    };

    getData();

  }

  return (
    <>
      {
        isLoading ? 
          <Spinner size='lg' color='default'/> : 
          <button onClick={()=> handleSample(oper)} className='hover:text-green-700'>
            {oper.name} 
          </button>
      }

      {
        showModal && (
          <>
            <ModalByOrder
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              oper={oper}
            />
          </>
        )
      }
    </>
  )
}

export default ButtonSamplesByOper