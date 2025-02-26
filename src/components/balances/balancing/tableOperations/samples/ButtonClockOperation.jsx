import React, { useState } from 'react'
import { FaClock } from 'react-icons/fa6'
import ModalSelectSamples from './ModalSelectSamples'
import { useRecoilState } from 'recoil';
import { newSamples, stepsSamples } from '../../../../../infraestructure/states/states_samples';

const ButtonClockOperation = ({item, selectedOperDetails, i}) => {
  const [isNewSamples, setIsNewSamples] = useRecoilState(newSamples);
  const [samples, setSamples] = useRecoilState(stepsSamples)
  

  const [isOpen, setIsOpen] = useState(false)

  const [Obj, setObj] = useState(null)

  const [itemAll, setItemAll] = useState(null)

  return (
   <>

    <button onClick={()=>{ 
        console.log(item)
        setItemAll(item)

        console.log(selectedOperDetails[i] )
        const data = {
          operation_balancing_id: item.operation_balancing_id,
          oper_id: selectedOperDetails[i].id
        }
        setObj(data)
        setIsOpen(true)
        setIsNewSamples(false)
        setSamples([])
      }}>
        <FaClock size={23}/>
    </button>

    {
      isOpen && 
        <ModalSelectSamples 
          itemAll={itemAll}
          Obj={Obj}
          isOpen={isOpen} 
          setIsOpen={setIsOpen}/>
    }
   
   
   </>
  )
}

export default ButtonClockOperation