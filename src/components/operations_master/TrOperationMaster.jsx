
import React, { useState } from 'react'
import { AiFillExperiment } from 'react-icons/ai'
import { useRecoilState } from 'recoil'
import { showOperationMasterObj } from '../../infraestructure/states/operation_master_state'
import { urlMain } from '../../infraestructure/data/const'
import { fetchGetData } from '../../infraestructure/call_api/crud'
import { CircularProgress } from '@nextui-org/react'

const TrOperationMaster = ({operation}) => {
  const [showOperation, setShowOperation] = useRecoilState(showOperationMasterObj)

  const [isLoading, setIsLoading] = useState(false)

  const handleOperation = (operation) => {
    setIsLoading(true)
    handleApi(operation)
  }


  const handleApi = (operation) => {
    const getData = async () => {
        try {
            //setLoading(true);
            const result = await fetchGetData(`${urlMain}/operations_master/get_operation_master?operation=${operation.operation}&sam=${operation.sam}`);

            setShowOperation(result)
            
        } catch (error) {
            console.error('Error al obtener los datos:', error);

        } finally {
          setIsLoading(false)
        }
    };
    
    getData();
  }

  return (
    <tr 
      onClick={() => handleOperation(operation)}
      key={operation.id} 
      className="border border-gray-300 hover:text-green-600 group"
    >
      <td className="p-1 border border-gray-300 cursor-pointer">
        {
          isLoading ? (
            <div className="flex justify-start ml-2">
              <CircularProgress size="lg" color="default" />
            </div>
          ):(
            <span className="py-2 px-1">
              {operation.operation}
            </span>
          )
        }
       
      </td>
      <td className="p-1 border border-gray-300 cursor-pointer">
        <span className="py-2 px-1">
          {operation.machine}
        </span>
      </td>
      <td className="p-1 border border-gray-300 cursor-pointer">
        <span className="py-2 px-1">
          {operation.sam}
        </span>
      </td>
      <td className="p-1 border border-gray-300 cursor-pointer">
        <span className="ml-6">
          <button className="text-gray-500 group-hover:text-green-600">
            <AiFillExperiment 
              size={23} 
              style={{ color: "currentColor" }} 
            />
          </button>
        </span>
      </td>
    </tr>
  )
}

export default TrOperationMaster