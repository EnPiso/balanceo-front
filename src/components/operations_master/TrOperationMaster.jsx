
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
      className="hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors cursor-pointer group"
    >
      <td className="p-2 border border-gray-100 dark:border-transparent">
        {
          isLoading ? (
            <div className="flex justify-start ml-2">
              <CircularProgress size="lg" color="default" />
            </div>
          ):(
            <span className="py-1 px-1">
              {operation.operation}
            </span>
          )
        }
      </td>
      <td className="p-2 border border-gray-100 dark:border-transparent">
        <span className="py-1 px-1">
          {operation.machine_name}
        </span>
      </td>
      <td className="p-2 border border-gray-100 dark:border-transparent">
        <span className="py-1 px-1">
          {operation.sam}
        </span>
      </td>
      <td className="p-2 border border-gray-100 dark:border-transparent">
        <span className="flex justify-end">
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