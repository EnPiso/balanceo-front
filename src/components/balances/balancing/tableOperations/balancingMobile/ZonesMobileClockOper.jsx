import React, { useState } from 'react'
import { FaClock } from 'react-icons/fa6'
import { useRecoilState } from 'recoil'
import { automaticByOper, isOpenModalSampleByOper, openByOper, operationsSamples, operByOper } from '../../../../../infraestructure/states/states_samples'
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states'
import { fetchGetData, fetchGetDataToken } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import { tokenMemory } from '../../../../../infraestructure/states/states_views'

const ZonesMobileClockOper = ({zone}) => {
  const [isLoading, setIsLoading] = useState(false)

  const [showModal, setIsShowModal] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples)


  
  const [isOpenModalByOper, setIsOpenModalByOper] = useRecoilState(openByOper)
  const [isAutomatic, setIsAutomatic] = useRecoilState(automaticByOper);
  const [openModalSampleByOper, setOpenModalSampleByOper] = useRecoilState(isOpenModalSampleByOper);
  const [selectOperByOper, setSelectOperByOper] = useRecoilState(operByOper);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
    
  const [token, setToken] = useRecoilState(tokenMemory);

  const handleSample = (oper) => {
      
    setSelectOperByOper(oper)
    const balancing_id = objBalancing.balancing_id
    const oper_id = oper.id

    const getData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchGetDataToken(`${urlMain}samplings/index_samples_by_oper?balancing_id=${balancing_id}&oper_id=${oper_id}`, token);
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
      <button onClick={()=> handleSample(zone[0].operator)}>
        <img
          src={zone[0].operator.avatar ? zone[0].operator.avatar : 'https://balance-assets.sfo3.digitaloceanspaces.com/assets/user.webp'}
          alt={zone[0].operator.avatar ? zone[0].operator.avatar : 'https://balance-assets.sfo3.digitaloceanspaces.com/assets/user.webp'}
          className="w-16 h-16 rounded-full object-cover"
          style={{
            border: `3px solid #22C55E`, // Azul personalizado con 6px de grosor
          }}
        />
        <span className="absolute bottom-0 left-9  px-2 py-1 rounded-full">
          <FaClock size={28} className='text-secondary_two bg-white rounded-full'/>
        </span>
      </button>
     
    </>
    
  )
}

export default ZonesMobileClockOper