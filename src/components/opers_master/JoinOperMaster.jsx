import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { isShowOperMaster, opersListModules } from '../../infraestructure/states/opers_states'
import { fetchGetData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import { CircularProgress, Tooltip } from '@nextui-org/react'
import { FaAccessibleIcon, FaEye, FaShower } from 'react-icons/fa'

const JoinOperMaster = ({oper}) => {

  const [isLoading, setIsLoading] = useState(false)
  
  const [operMaster, setOperMaster] = useRecoilState(isShowOperMaster)


  const handleOperMaster = (oper) => {

      setIsLoading(true)
    
      const getData = async () => {
        
        try {
          const data = await fetchGetData(`${urlMain}opers/get_oper_master?oper_id=${oper.id}`);
          
          setOperMaster(data);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        } finally {
          setIsLoading(false)
        }
      };
  
      getData();

    } 

  return (

    <>

      <span>
        {
          isLoading ? (
            <>
              <div className="flex justify-start mr-3">
                <CircularProgress size="sm" color="default" />
              </div>
            </>
          ) :
          <> 
          <Tooltip content="Detalle del operario" placement="bottom" className="z-50">
            <button 
              onClick={() => handleOperMaster(oper)}>
                <FaEye size={30} className="text-secondary_two mr-3"/>
            </button>
          </Tooltip>
            
          </> 
        
        }
      </span>
    </>
    
  )
}

export default JoinOperMaster