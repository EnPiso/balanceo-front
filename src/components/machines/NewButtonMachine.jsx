import { Tooltip } from '@nextui-org/react'
import React,{useState} from 'react'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import ModalFormOperMaster from '../opers_master/new_oper/ModalFormOperMaster'
import ModalFormMachine from './ModalFormMachine'

const NewButtonMachine = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Tooltip placement={"right-end"} content={"Agregar nueva máquina"}>
          <button 
            onClick={()=> setIsOpen(true)}
          >
            <FaPlus size={23} className={"ml-3 text-secondary_two"}/>
          </button>
      </Tooltip>

      {
        isOpen && 
          <ModalFormMachine
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
      }
      
    </>
  )
}

export default NewButtonMachine