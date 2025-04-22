import { Badge } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaClock } from 'react-icons/fa6'
import { detailOperOperations } from '../../../../../infraestructure/states/states_balancing';
import { useRecoilState } from 'recoil';
import ButtonClockOperation from '../samples/ButtonClockOperation';
import { checkOpersPosition } from '../../../../../infraestructure/states/opers_states';
import { isOpenModalSample, newSamples, openOperaClock, stepsSamples } from '../../../../../infraestructure/states/states_samples';

const ZonesMobileClock = ({operationDetail, zone, opIndex}) => {
  
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [selectedOperDetails] = useRecoilState(checkOpersPosition);
  
  const [isNewSamples, setIsNewSamples] = useRecoilState(newSamples);
  const [samples, setSamples] = useRecoilState(stepsSamples)
    
  
  const [isOpen, setIsOpen] = useState(false)
  //OpenOperaClock setOpenOperaClock 
  const [Obj, setObj] = useState(null)

  const [operaClock, setOperaClock] = useRecoilState(openOperaClock)
  const [isModalSample, setIsModalSample] = useRecoilState(isOpenModalSample)
  
    // 
  
  const [itemAll, setItemAll] = useState(null)


  const handleClock = (item, i) => { 
    
    setItemAll(item)
    const oper_id = operationDetail.detailObj.oper_id
    
    const operation_balancing_id = item.operation_balancing_id

    const searchDetailObj = (oper_id, operations_balancing_id) => {
      return detailOperOpera.find(item => 
        item.oper_id === oper_id && item.detail.operations_balancing_id === operations_balancing_id
      );
    };
    const detail = searchDetailObj(oper_id, operation_balancing_id)        
    
    // console.log(selectedOperDetails[i])
    
    const data = {
      operation_balancing_id: item.operation_balancing_id,
      oper_id: oper_id,
      detail_id: operationDetail.detailObj.detail.id
    }
    
    const dataUpdate = {
      itemAll: item,
      obj: data
    }
    
  
    setOperaClock(dataUpdate)
    setObj(data)
    setIsModalSample(true)
    setIsNewSamples(false)
    setSamples([])
  }


  return (
    <div className='mr-2 text-secondary_two'>
      
        {
           operationDetail.detailObj && operationDetail.detailObj.detail  && (
            <button 
              onClick={() => handleClock(operationDetail.operation, opIndex)}
              className="flex flex-col"
            >
              <div className="flex justify-end">
                {operationDetail.detailObj.detail.samplings_count > 0 ? (
                  <Badge
                    shape="rectangle"
                    showOutline={false}
                    color="default"
                    content={
                      <span className="text-secondary_one font-bold text-2xl">
                        {operationDetail.detailObj.detail.samplings_count}
                      </span>
                    }
                    className="mt-6"
                  >
                    <FaClock size={44} />
                  </Badge>
                ) : (
                  <FaClock size={44} />
                )}
              </div>
              <span className="text-sm font-bold text-secondary_two">
                Secuencial Operaciones
              </span>
            </button>
           )
        }
        
    </div>
  )
}

export default ZonesMobileClock