import { CircularProgress, Tooltip } from '@nextui-org/react'
import React,{useState} from 'react'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import ModalCreateOperationManual from './ModalCreateOperationManual'
import { selectAllMachines } from '../../infraestructure/states/states_machine'
import { useRecoilState } from 'recoil'
import { fetchGetData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'

const NewBtnOperationMaster = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [allMachines, setAllMachines] = useRecoilState(selectAllMachines);
  
  const handleClick = () => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchGetData(`${urlMain}machines/all_machines`);
        // console.log(result);
        setAllMachines(result)
        
        setIsOpen(true)
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
        <CircularProgress size='23' color="default"/> : 
        <Tooltip placement={"right-end"} content={"Agregar nueva operación"}>
          <button 
            onClick={handleClick}
          >
            <FaPlus size={23} className={"ml-3 text-secondary_two"}/>
          </button>
        </Tooltip>
    }
      

      {
        isOpen && 
          <ModalCreateOperationManual
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
      }
      
    </>
  )
}

export default NewBtnOperationMaster