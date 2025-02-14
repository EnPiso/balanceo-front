
import React, { useState, useEffect } from 'react'

import { Avatar, CircularProgress } from '@nextui-org/react'
import { userAvatarImage } from '../../infraestructure/data/links'
import ImageAvatarMaster from './ImageAvatarMaster'
import { fetchGetData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import { useRecoilState } from 'recoil'
import { isShowOperMaster } from '../../infraestructure/states/opers_states'




const TrOperMaster = ({oper}) => {
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
    <tr 
      key={oper.id} 
      className="border border-gray-300 hover:text-green-600 group capitalize"
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
      <td className="p-1 border border-gray-300 cursor-pointer">
        <span className="py-2 px-1 flex justify-start">
          {
            oper.avatar ? 
              <ImageAvatarMaster 
                image={oper.avatar}/> : 
              <Avatar 
                size="md" 
                src={`${userAvatarImage}`} 
                alt="avatar" 
                className="w-10 h-10 rounded-full"/>
          }
          
          
          
        </span>
      </td>
    </tr>
  )
}

export default TrOperMaster