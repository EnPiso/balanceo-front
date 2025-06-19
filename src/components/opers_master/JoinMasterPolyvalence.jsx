import { CircularProgress, Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import { useRecoilState } from 'recoil'
import { isShowOperMaster, opersListModules } from '../../infraestructure/states/opers_states'
import ModalOperModule from './ModalOperModule'
import { fetchGetData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'

const JoinMasterPolyvalence = ({ oper, setIsOpen, setOpersModules }) => {
    const [isLoading, setIsLoading] = useState(false)
    
  
    const [isLoadingModules, setIsLoadingModules] = useState(false)
    
    const [operMaster, setOperMaster] = useRecoilState(isShowOperMaster)
  
    


  const handleChangeModule = (oper) => { 
      setIsLoadingModules(true)
      // opers/production_modules
      const getData = async () => {
        
        try {
          const result = await fetchGetData(`${urlMain}opers/production_modules`);
          const data = {
            oper: oper,
            modules: result
          }
          setOpersModules(data) ///acá
          
          setIsOpen(true)
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        } finally {
          setIsLoadingModules(false)
        }
      };
  
      getData();
  
    }

  return (
    <>

      <span>
        {
          isLoadingModules ? (
            <>
              <div className="flex justify-start mr-3">
                <CircularProgress size="sm" color="default" />
              </div>
            </>
          ) :
          <> 
          <Tooltip content="Cambiar módulo" placement="bottom" className="z-50">
            <button 
              onClick={() => handleChangeModule(oper)}>
                <FaExchangeAlt size={30} className="text-secondary_two mr-3"/>
            </button>
          </Tooltip>
            
          </> 
        
        }
      </span>
      
    </>
    
  )
}

export default JoinMasterPolyvalence