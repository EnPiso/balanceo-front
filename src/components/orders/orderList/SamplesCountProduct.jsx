import { Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaClockRotateLeft } from 'react-icons/fa6'
import { useRecoilState } from 'recoil'
import { showOrderObj } from '../../../infraestructure/states/order_states'
import { fetchGetData } from '../../../infraestructure/call_api/crud'
import { urlMain } from '../../../infraestructure/data/const'
import { goToBalance, isLoadingTime, timeDataCyclesNum } from '../../../infraestructure/states/operation_master_state'
import { clockGlobalModal, clockZoneByZoneModal } from '../../../infraestructure/states/states_mobile'
import { isShowModalZoneSample } from '../../../infraestructure/states/states_samples_zones'
import { isOpenModalSampleByOper, openByOper } from '../../../infraestructure/states/states_samples'

const SamplesCountProduct = ({value, style, tooltip, product, timeCyclesGo, order}) => {

  const [showOrder, setShowOrder] = useRecoilState(showOrderObj)

  const [goToBalanceObj, setBoToBalanceObj] = useRecoilState(goToBalance)

  const [numTimeDataCycles, setNumTimeDataCycles] = useRecoilState(timeDataCyclesNum)

  const [clockGlobal, setClockGlobal]  = useRecoilState(clockGlobalModal)
  const [zoneByZoneModal, setZoneByZoneModal]  = useRecoilState(clockZoneByZoneModal)
  const [isShowModalZone, setIsShowModalZone] = useRecoilState(isShowModalZoneSample)
  const [openModalSampleByOper, setOpenModalSampleByOper] = useRecoilState(isOpenModalSampleByOper);
  const [isOpenModalByOper, setIsOpenModalByOper] = useRecoilState(openByOper)
  
  

  const [isLoading, setIsLoading] = useState(false);
  

  const handleShowOrder = (order_id, timeCyclesGo) => {
    setIsLoading(true)
    
    //setShowOrder(order)
    const getData = async () => {
      try {
        //setLoading(true);
        const result = await fetchGetData(`${urlMain}orders/${order_id}/show_order_details/`);

        setShowOrder(result)
        
        if(timeCyclesGo === 1){
          setClockGlobal(true)
        } else if(timeCyclesGo === 2){
          setZoneByZoneModal(true)
        } else if(timeCyclesGo === 3){
          setIsShowModalZone(true)
        } else if(timeCyclesGo === 4){ 
          setOpenModalSampleByOper(true)
          setIsOpenModalByOper(true)
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);

      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }

  const handleSampleGo = (product, timeCyclesGo, order) => {
    const toBalance = {
      product: product
    }
    
    // console.log(toBalance, timeCyclesGo, order.id)
    
    setBoToBalanceObj(toBalance)
    setNumTimeDataCycles(timeCyclesGo)
    handleShowOrder(order.id, timeCyclesGo)
  }

  return (
    <>
      {
        value > 0 && <>
          {
            tooltip ? (
              
                <Tooltip placement="top" content={tooltip}>
                  <span
                    onClick={()=> handleSampleGo(product, timeCyclesGo, order)}
                    className="ml-2 mr-2 relative">
                    <FaClockRotateLeft 
                        className={`w-6 h-6 rounded-full object-cover text-${style}-500`}/>
                    <small className={`absolute bottom-2 left-6  rounded-ful font-bold  text-${style}-500`}>
                      {value}
                    </small>
                  </span> 
                </Tooltip>
              
            ) : (
              <span 
                onClick={()=> handleSampleGo(product, timeCyclesGo, order)}
                className="ml-2 mr-2 relative">
                <FaClockRotateLeft 
                    className={`w-6 h-6 rounded-full object-cover text-${style}-500`}/>
                <small className={`absolute bottom-2 left-6  rounded-ful font-bold  text-${style}-500`}>
                  {value}
                </small>
              </span>
            )
          }
        
            
        </>
          
      }
    </>
  )
}

export default SamplesCountProduct