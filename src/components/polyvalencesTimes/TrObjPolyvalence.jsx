import React, { useState } from 'react'
import ImageAvatarMaster from '../opers_master/ImageAvatarMaster'
import { fetchGetData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import { MyOperationsPoly, OperPolyvalence, setOperPolyvalence } from '../../infraestructure/states/states_polyvalence'
import PolyvalenceMachine from './PolyvalenceMachine'
import { useRecoilState } from 'recoil'
import { CircularProgress } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { timeToSeconds } from '../../ui/utils'
import TextColorPercent from './TextColorPercent'

const TrObjPolyvalence = ({
  oper,
  setOperPoly,
  setAllMachines,
  operPoly,
  allMachines, 
  machineSelect,
  setMachineSelect
}) => {

  const [ isLoading,setIsLoading ] = useState(false)

  const [ operationsPoly, setOperationsPoly ] = useRecoilState(MyOperationsPoly)
  
  

  const handlePolyvalence = (oper) => {
    
    const oper_id = oper.id

    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}polyvalences_times/operations_by_oper?oper_id=${oper_id}`);
        console.log(result);
        setAllMachines(result.machines)
        debugger
        
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getData();
  }

  const handleMachine = (oper) => {
    const oper_id = oper.id
    setIsLoading(true)
    setOperationsPoly([])
    setMachineSelect('')
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}polyvalences_times/unique_machines?oper_id=${oper_id}`);
        // console.log(result);
        
        setOperPoly(oper)
        setAllMachines(result.machines)
        if(result.no_samplings){
          toast.error(`${oper.name}, no tiene tomas de tiempos`)
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
      }
    };

    getData();
  }


  return (
      <tr 
        key={oper.id} 
        className="hover:text-secondary_two group capitalize">
        <td
          className="p-1 border border-gray-300 cursor-pointer">
            {
              isLoading ? 
                <CircularProgress color='success'/> :
                <button
                  onClick={() => handleMachine(oper)}
                >
                  <span className={`capitalize py-2 px-1 mb-3 ${operPoly && (oper.id === operPoly.id) ? 'text-secondary_two font-bold' : ''}`}>
                    {oper.name}  
                  </span>   
                </button>
            }
            
            
            { operPoly && (oper.id === operPoly.id) && ( allMachines && allMachines.length > 0 ) && (
              <div className="flex flex-wrap gap-1 mt-1">
                {allMachines.map((machine, idx) => (
                  <PolyvalenceMachine
                    machine={machine}
                    idx={idx}
                    setMachineSelect={setMachineSelect}
                    machineSelect={machineSelect}
                  />
                ))}
              </div>
            )}

            {
              operPoly && (oper.id === operPoly.id) && operationsPoly.length >= 1 &&
                <div className="mt-2 space-y-2">
                  {operationsPoly.map((operation, i) => (
                    <div key={i} className="p-2 bg-gray-50 rounded shadow-sm">
                      <div className="font-semibold text-sm text-gray-700 mb-1">
                        {operation.operation}
                      
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {operation.samplings.map((sampling, j) => (
                          <TextColorPercent 
                            total_percent={operation.total_percent}
                            key={j} 
                            value={Math.round((operation.sam_seg / timeToSeconds(sampling.sample)) * 100)}/>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
            }
            
        </td>
        <td 
          className="p-1 border border-gray-300 cursor-pointer">
          <span className="py-1 px-1">
            {oper.id_oper}
          </span>
        </td>
        <td className="p-1 border border-gray-300 pl-2 ">
          <span className='py-1 px-1 flex justify-end'>
            <ImageAvatarMaster 
              image={oper.avatar}/>
          </span>
        </td>
      </tr>
  )
}

export default TrObjPolyvalence