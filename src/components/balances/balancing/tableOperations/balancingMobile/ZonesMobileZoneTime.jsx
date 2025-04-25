import React from 'react'
import { FaClock } from 'react-icons/fa'
import { useRecoilState } from 'recoil'
import { isShowModalZoneSample, zoneOperSampleObj, zonesSamplesDetail } from '../../../../../infraestructure/states/states_samples_zones'
import { detailOperOperations } from '../../../../../infraestructure/states/states_balancing'
import { allOperationsProduct } from '../../../../../infraestructure/states/operation_states'

const ZonesMobileZoneTime = ({operationDetail}) => {

  const [isShowModalZone, setIsShowModalZone] = useRecoilState(isShowModalZoneSample)
  
  const [zoneOperSample, setZoneOperSample] = useRecoilState(zoneOperSampleObj)

  const [zonesDetailSample, setZonesDetailSample] = useRecoilState(zonesSamplesDetail)
  
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  
  const [detailOperOpera] = useRecoilState(detailOperOperations);
  
  const handleClick = (operationDetail) => {
    
    const opers_balancing_id = operationDetail.detailObj.detail.opers_balancing_id

    const filtered = detailOperOpera.filter(item => item.detail.opers_balancing_id === opers_balancing_id)
    
    const ids = filtered.map(item => item.detail.operations_balancing_id)

    const filteredUpdate = operationsProduct.filter(item =>
      ids.includes(item.operation_balancing_id)
    );
    
    setZonesDetailSample(filteredUpdate)
    setIsShowModalZone(true)
    setZoneOperSample(operationDetail)
  }

  return (
    <>
      <button 
        onClick={()=> handleClick(operationDetail)}>
        <FaClock 
          className="w-11 h-11 rounded-full object-cover text-primary_one"
          style={{
            border: `3px solid #EAB308`, // Azul personalizado con 6px de grosor
          }} />
        <span className="absolute bottom-0 left-6 px-2 py-1 rounded-full">
          <h1 
            className='text-secondary_two bg-white rounded-full'>
            <span className="text-start px-1 rounded-md bg-zinc-100 cursor-pointer text-secondary_two font-bold flex justify-between items-center">
              Tiempo de la zona 
            </span>
          </h1>
        </span>
      </button>
    </>
   
  )
}

export default ZonesMobileZoneTime