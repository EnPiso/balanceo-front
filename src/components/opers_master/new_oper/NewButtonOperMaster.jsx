import { Tooltip } from '@nextui-org/react'
import React,{useState} from 'react'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import ModalFormOperMaster from './ModalFormOperMaster'

const NewButtonOperMaster = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Tooltip placement={"right-end"} content={"Agregar nuevo operario"}>
          <button 
            onClick={()=> setIsOpen(true)}
          >
            <FaPlus size={23} className={"ml-3 text-secondary_two"}/>
          </button>
      </Tooltip>

      {
        isOpen && 
          <ModalFormOperMaster
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
      }
      
    </>
  )
}

export default NewButtonOperMaster