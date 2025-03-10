import React from 'react'
import ConfirmDeleteSample from './ConfirmDeleteSample'
import { timeToSeconds } from '../../../../../ui/utils'
import { Tooltip } from '@nextui-org/react'

const ObjForPolyvalence = ({sample, setSamples, i, isEdit, handleEdit, samSeg, samples}) => {
  return (
    <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900 text-gray-900 dark:text-white">
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">
        {i+1}  
      </td>
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
        <Tooltip content="Editar muestra">
          <span onClick={() => handleEdit(sample)} className={`flex justify-between items-center cursor-pointer ${isEdit && isEdit.id === sample.id && 'text-green-700'}`}>
            {sample.sample}    
            <span>
            {timeToSeconds(sample.sample)}  
            </span>      
                
          </span>
        </Tooltip> 
      </td>
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
        <span className="flex justify-end">
          {samSeg}
        </span>
      </td>
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
        
        <span className="flex justify-end">
          {
            Math.round((samSeg / timeToSeconds(sample.sample)) * 100)
          } %
        </span>
        
      </td>
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
        <span className="flex justify-end">
          <ConfirmDeleteSample sample={sample} index={i+1} setSamples={setSamples} samples={samples}/>
        </span>
      
      </td>
    </tr>
    
  )
}

export default ObjForPolyvalence