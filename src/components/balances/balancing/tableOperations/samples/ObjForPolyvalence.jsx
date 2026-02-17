import React from 'react'
import ConfirmDeleteSample from './ConfirmDeleteSample'
import { timeToSeconds } from '../../../../../ui/utils'
import { Tooltip } from '@nextui-org/react'
import PercentSamplesZones from '../../../../../ui/PercentageBox'
import { useRecoilState } from 'recoil'
import { currentUser } from '../../../../../infraestructure/states/states_views'
import TagCreateUserName from '../../../../../ui/TagCreateUserName'

const ObjForPolyvalence = ({sample, setSamples, i, isEdit, handleEdit, samSeg, samples}) => {

  const [user, setUser] = useRecoilState(currentUser);
  
  return (
    <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900 text-gray-900 dark:text-white">
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600  text-left">
        <span className="font-bold">
          {i+1}
        </span>
        <span className='ml-2 capitalize'>
          <small>
            {sample.user_name && <TagCreateUserName user_name={sample.user_name}/>}
          </small>
        </span>
      </td>
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
        {
          user && (user.role === 'admin' || user.role === 'supervisor') ? 
            <Tooltip content="Editar muestra">
              <span onClick={() => handleEdit(sample)} className={`font-bold flex justify-between items-center cursor-pointer ${isEdit && isEdit.id === sample.id && 'text-green-700'}`}>
                {sample.sample}    
                <span className='font-bold'>
                {timeToSeconds(sample.sample)} s
                </span>      
                    
              </span>
            </Tooltip> :
            <span className={`font-bold flex justify-between items-center `}>
              {sample.sample}    
              <span className='font-bold'>
                {timeToSeconds(sample.sample)} s
              </span> 
            </span>
        }
        
      </td>
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
        <span className="flex justify-end font-bold">
          {samSeg} s
        </span>
      </td>
      <td className="px-1 py-2 border border-gray-300 dark:border-gray-600 w-36">
        
      <PercentSamplesZones value={Math.round((samSeg / timeToSeconds(sample.sample)) * 100)}/>

      </td>
      {
        user && (user.role === 'admin' || user.role === 'supervisor') && (
          <>
            <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
              <span className="flex justify-end">
                <ConfirmDeleteSample sample={sample} index={i+1} setSamples={setSamples} samples={samples}/>
              </span>
            </td>
          </>
        )
      }
      
    </tr>
    
  )
}

export default ObjForPolyvalence