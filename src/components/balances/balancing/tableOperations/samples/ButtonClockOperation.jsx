import React, { useState } from 'react'
import { FaClock } from 'react-icons/fa6'
import ModalSelectSamples from './ModalSelectSamples'
import { useRecoilState } from 'recoil';
import { isOpenModalSample, isSampleObj, newSamples, openOperaClock, stepsSamples } from '../../../../../infraestructure/states/states_samples';
import { detailOperOperations } from '../../../../../infraestructure/states/states_balancing';
import { Badge } from '@nextui-org/react';

const ButtonClockOperation = ({item, selectedOperDetails, i, samplingsCount}) => {
  const [isNewSamples, setIsNewSamples] = useRecoilState(newSamples);
  const [samples, setSamples] = useRecoilState(stepsSamples)
  

  const [isOpen, setIsOpen] = useState(false)
//OpenOperaClock setOpenOperaClock 
  const [Obj, setObj] = useState(null)

  const [operaClock, setOperaClock] = useRecoilState(openOperaClock)
  const [isModalSample, setIsModalSample] = useRecoilState(isOpenModalSample)
  
  // 

  const [itemAll, setItemAll] = useState(null)
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  
  


  return (
   <>
  
    <button onClick={()=>{ 
        console.log(item, detailOperOpera)
        setItemAll(item)
        debugger
        const oper_id = selectedOperDetails[i].id
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
          oper_id: selectedOperDetails[i].id,
          detail_id: detail.detail.id
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
      }}>
        {
          samplingsCount > 0 ? (
            <Badge
                shape="rectangle" 
                showOutline={false}
                color="default" 
                content={<span className='text-primary_one font-black'>{samplingsCount}</span>} 
                className="mt-6">
                <FaClock size={23}/>
            </Badge>
          ) : (
            <FaClock size={23}/>  
          )
        }
        
    </button>

  
   
   </>
  )
}

export default ButtonClockOperation