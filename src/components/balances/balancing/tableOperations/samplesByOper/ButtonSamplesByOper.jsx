import React, { useState } from 'react'
import { fetchGetData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import { Spinner, Tooltip } from '@nextui-org/react';
import ModalByOrder from './ModalByOrder';
import { useRecoilState } from 'recoil';
import { automaticByOper, isOpenModalSampleByOper, openByOper, operationsSamples, operByOper } from '../../../../../infraestructure/states/states_samples';
import { FaRegTimesCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { FaClock, FaTimeline } from 'react-icons/fa6';
import { firstWordInString } from '../../../../../ui/utils';

const ButtonSamplesByOper = ({oper,objBalancing}) => {

  const [isLoading, setIsLoading] = useState(false)

  const [showModal, setIsShowModal] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples)


  
  const [isOpenModalByOper, setIsOpenModalByOper] = useRecoilState(openByOper)
  const [isAutomatic, setIsAutomatic] = useRecoilState(automaticByOper);
  const [openModalSampleByOper, setOpenModalSampleByOper] = useRecoilState(isOpenModalSampleByOper);
  const [selectOperByOper, setSelectOperByOper] = useRecoilState(operByOper);

  

  const handleSample = (oper) => {
    setSelectOperByOper(oper)
    const balancing_id = objBalancing.balancing_id
    const oper_id = oper.id

    const getData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchGetData(`${urlMain}samplings/index_samples_by_oper?balancing_id=${balancing_id}&oper_id=${oper_id}`);
        // console.log(result,oper)
        setSamplesOperations(result.operations)
        
       // setIsShowModal(true)
        setOpenModalSampleByOper(true)
        setIsOpenModalByOper(true)

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
          <Spinner size='lg' color='default'/> : (
            <>
              <Tooltip content={oper.name}>
                <button onClick={()=> {
                    handleSample(oper)
                    setIsAutomatic(false)
                  }} className='hover:text-green-700 flex justify-between items-center'>
                  <span>
                    {oper.name && firstWordInString(oper.name)}
                  </span>
                  <FaClock className='ml-2'/>
                </button>
              </Tooltip>
            </>
          )
          
      }

     
    </>
  )
}

export default ButtonSamplesByOper