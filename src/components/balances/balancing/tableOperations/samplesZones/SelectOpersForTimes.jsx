import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { checkOpersPosition } from '../../../../../infraestructure/states/opers_states';
import { Avatar, CircularProgress } from '@nextui-org/react';
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { fetchGetData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import { FaEye, FaRightLong } from 'react-icons/fa6';
import { zoneOperSampleObj, zonesSamplesDetail } from '../../../../../infraestructure/states/states_samples_zones';
import { detailOperOperations } from '../../../../../infraestructure/states/states_balancing';
import { zonesMobile } from '../../../../../infraestructure/states/states_mobile';
import { allOperationsProduct } from '../../../../../infraestructure/states/operation_states';

const SelectOpersForTimes = ({
  setOpersBalancingId, 
  isOnlyOper, 
  handleSample, 
  isShowDetail, 
  setIsShowDetail, 
  setoperTemporal,
  operTemporal
}) => {
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [zonesDetailSample, setZonesDetailSample] = useRecoilState(zonesSamplesDetail)
  const [detailOperOpera] = useRecoilState(detailOperOperations);
  const [zonesOperUpdate] = useRecoilState(zonesMobile);
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  const [zoneOperSample, setZoneOperSample] = useRecoilState(zoneOperSampleObj)
  
  
  const handleOperClick = (oper) => {
    if(isOnlyOper){
      handleSample(oper)
      return true
    }
    
    const queryParams = new URLSearchParams({
      balancing_id: objBalancing.balancing_id,
      oper_id: oper.id, // Si necesitas pasar más parámetros
    });

    // opers_balancings/get_opers_balancing_id
    const getData = async () => {
      try {
        const opers_balancing_id = await fetchGetData(`${urlMain}opers_balancings/get_opers_balancing_id?${queryParams.toString()}`);
       
        setOpersBalancingId(opers_balancing_id)
        setIsShowDetail(false)
        setoperTemporal(oper)

        const filtered = detailOperOpera.filter(item => item.detail.opers_balancing_id === opers_balancing_id)
      
        const ids = filtered.map(item => item.detail.operations_balancing_id)

        const filteredUpdate = operationsProduct.filter(item =>
          ids.includes(item.operation_balancing_id)
        );
        const result = zonesOperUpdate.flatMap(array => array).find(item => item.operator.id === oper.id);
        setZoneOperSample(result)
        
        setZonesDetailSample(filteredUpdate)

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    getData();
  }

  return (
    <div>
      {
        selectedOperDetails.length >= 1 &&
          <h1 
            onClick={() => {
              setIsShowDetail(!isShowDetail)
            }}
            className={`${'cursor-pointer'} text-start flex items-center text-secondary_two font-bold text-lg mb-3`}>
           {isShowDetail ? 'Seleccionar el operario' : 'Cambiar operario'}  
           {isShowDetail ? <FaRightLong className='ml-2'/> : <FaEye className='ml-2'/>} 
          </h1>
      }
      {
        isShowDetail && (
          <>
            {
              selectedOperDetails.map((oper, i)=> {
                return(
                  <button 
                    onClick={() => handleOperClick(oper)}
                    key={i} 
                    className="flex items-center justify-between py-2 px-4 mb-2  rounded-lg shadow-sm">
                    <span className={`${operTemporal && (operTemporal.id === oper.id) ? 'hover-text-primary_one text-secondary_two' : 'text-primary_one hover:text-secondary_two'}  font-bold ml-1`}>
                      {oper.name}
                    </span>
                    <span className="ml-1">
                      <Avatar src={oper.avatar} alt="" />
                    </span>
                  </button>
                )
              })
            }
            {
              selectedOperDetails.length === 0 && (
                <div className="flex justify-center">
                  <CircularProgress size='lg' color='default'/>
                </div>
              )
            }
                </>
              )
          }
      
    </div>
  )
}

export default SelectOpersForTimes