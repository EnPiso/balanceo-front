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
import ModalOperPoly from './ModalOperPoly'

const TrObjPolyvalence = ({
  oper,
  setOperPoly,
  setAllMachines,
  operPoly,
  allMachines, 
  machineSelect,
  setMachineSelect,
  setIsShowCard,
  isShowCard
}) => {

  const [ isLoading, setIsLoading ] = useState(false)

  const [ operationsPoly, setOperationsPoly ] = useRecoilState(MyOperationsPoly)

  const [ isShowOper, setIsShowOper ] = useState(false)
  
  const [ operTemporal, setOperTemporal ] = useState(null)

  const handlePolyvalence = (oper) => {
    
    const oper_id = oper.id

    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}polyvalences_times/operations_by_oper?oper_id=${oper_id}`);
        console.log(result);
        setAllMachines(result.machines)
        
        
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
        const result = await fetchGetData(`${urlMain}polyvalences_times/update_unique_machines?oper_id=${oper_id}`);
        // console.log(result);
        
        setOperPoly(oper)
        setAllMachines(result)
        setOperTemporal(oper)
        setIsShowOper(true)
        if(result.length < 1){
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
  
  const handleClose = () => {
    setIsShowOper(false)
  }


  return (
      <>
        
        <tr 
          key={oper.id} 
          className="hover:text-secondary_two group capitalize">
          <td
            className="p-1 border border-gray-300 cursor-pointer">
              <span className="flex justify-between items-center">
                {
                  isLoading ? 
                    <CircularProgress color='success'/> :
                    <button
                      onClick={() => {
                        handleMachine(oper)
                      }}
                    >
                      <span className={`capitalize py-2 px-1 mb-3 ${operPoly && (oper.id === operPoly.id) ? 'text-secondary_two font-bold' : ''}`}>
                        {oper.name}  
                      </span>   
                    </button>
                }
                
              </span>
              
            
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
          {
            isShowOper &&
              <ModalOperPoly
                isOpen={isShowOper}
                setIsOpen={setIsShowOper}
                handleClose={handleClose}
                oper={operTemporal}
                operPoly={operPoly}
                allMachines={allMachines}
                setMachineSelect={setMachineSelect}
                machineSelect={machineSelect}
                handleMachine={handleMachine}
              />
          }
          
        </tr>
      
      </>
      
      
  )
}

export default TrObjPolyvalence