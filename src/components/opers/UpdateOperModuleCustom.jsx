import React, { useState } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import { useRecoilState } from 'recoil'
import { isShowOperMaster, opersListModules } from '../../infraestructure/states/opers_states'
import { fetchGetData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import ModalOperModule from '../opers_master/ModalOperModule'
import { Tooltip } from '@nextui-org/react'

const UpdateOperModuleCustom = ({oper}) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const [isOpen, setIsOpen] = useState(false)

  const [isLoadingModules, setIsLoadingModules] = useState(false)
  
  const [opersModules, setOpersModules] = useRecoilState(opersListModules)

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
        <Tooltip content="Cambiar módulo" placement="left" className="cursor-pointer">
          <button onClick={() => handleChangeModule(oper)} className="mr-2">
            <FaExchangeAlt size={23} className="text-secondary_two"/>
          </button>
        </Tooltip>
       
        <ModalOperModule
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
        />
       
    </>
  )
}

export default UpdateOperModuleCustom