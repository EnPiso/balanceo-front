import React, { useState } from 'react'
import CustomButton from '../../ui/CustomButton'
import { CircularProgress } from '@nextui-org/react'
import { postData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import { useRecoilState } from 'recoil'
import { operationsArrayMaster } from '../../infraestructure/states/operation_master_state'
import toast from 'react-hot-toast'
import { FaSave } from 'react-icons/fa'

const BtnCreateManualOperation = ({operation, setIsOpen}) => {

  const [masterOperations, setMasterOperations] = useRecoilState(operationsArrayMaster)
  
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSubmit = () => {
    operation.is_manual = true

    const data = {
      operation: operation
    }
    debugger
    const postDataOrder = async (data) => {
      setIsLoading(true)
      try {
        const result = await postData(urlMain + "operations/create_manual", data)
        
        setMasterOperations([...masterOperations, result])
        
        toast.success("Se ha guardado con exito la operación")
        // setListPlants([...listPlants, result])
        setIsOpen(false)
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false);
      }
    };

    postDataOrder(data);
    
  }

  return (
    <div>
      {
        isLoading ? 
          <CircularProgress size={24} color={"default"} /> : 
          <CustomButton
            color="default"
            variant="bordered"
            startContent={<FaSave color="green"/>}
            onClick={handleSubmit}
            title="Guardar operación"
          />
      }  
    </div>
  )
}

export default BtnCreateManualOperation