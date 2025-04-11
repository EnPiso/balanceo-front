
import React, { useState, useEffect } from 'react'

import { Avatar, CircularProgress, Tooltip } from '@nextui-org/react'
import { userAvatarImage } from '../../infraestructure/data/links'
import ImageAvatarMaster from './ImageAvatarMaster'
import { fetchGetData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import { useRecoilState } from 'recoil'
import { isShowOperMaster, opersListModules } from '../../infraestructure/states/opers_states'
import { FaArrowUpFromBracket, FaBackward, FaTrowelBricks, FaUpwork } from 'react-icons/fa6'
import { FaExchangeAlt } from 'react-icons/fa'
import ModalOperModule from './ModalOperModule'
import AutocompleteOpersMaster from './AutocompleteOpersMaster'




const TrOperMaster = ({oper}) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const [isOpen, setIsOpen] = useState(false)

  const [isLoadingModules, setIsLoadingModules] = useState(false)
  
  const [operMaster, setOperMaster] = useRecoilState(isShowOperMaster)

  const [opersModules, setOpersModules] = useRecoilState(opersListModules)
  

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
    <tr 
      key={oper.id} 
      className="hover:text-green-600 group capitalize"
    >
      <td
        onClick={() => handleOperMaster(oper)}
        className="p-1 border border-gray-300 cursor-pointer">
        {
          isLoading ? (
            <div className="flex justify-start ml-2">
              <CircularProgress size="lg" color="default" />
            </div>
          ):(
            <span className="py-2 px-1">
              {oper.name}  
            </span>
          )
        }
      </td>
      
      <td 
        onClick={() => handleOperMaster(oper)}
        className="p-1 border border-gray-300 cursor-pointer">
        <span className="py-2 px-1">
          {oper.id_oper}
        </span>
      </td>
      <td className="p-1 border border-gray-300 cursor-pointer ">
        <span className="flex justify-between items-center py-1 px-1">
          <span>
          
            <ImageAvatarMaster 
              image={oper.avatar}/>
          </span>
          
          <span>
            {
              isLoadingModules ? (
                <>
                  <div className="flex justify-start ml-2">
                    <CircularProgress size="md" color="default" />
                  </div>
                </>
              ) :
              <> 
                <button 
                  onClick={() => handleChangeModule(oper)}>
                  <FaExchangeAlt size={24} className="text-secondary_two mr-1"/>
                </button>
              </> 
            
            }
          </span>
        </span>
          
          <ModalOperModule
            isOpen={isOpen} 
            setIsOpen={setIsOpen}
          />
       
      </td>
      
    </tr>
  )
}

export default TrOperMaster