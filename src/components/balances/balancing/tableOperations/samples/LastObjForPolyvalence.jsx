import React from 'react'
import { timeToSeconds } from '../../../../../ui/utils'
import { FaEquals } from 'react-icons/fa'
import PercentSamplesZones from '../../../../../ui/PercentageBox'

const LastObjForPolyvalence = ({samples,samSeg, isObj}) => {
  return (
    <tr className={`text-gray-900 ${isObj ? 'bg-secondary_two' : 'bg-zinc-200'} `} >
      <td className="flex justify-center px-4 py-2 ">
        <FaEquals className={`text-2xl ${isObj ? 'text-green-700' : 'text-zinc-700'} `}  />
      </td>
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
        <span className="flex justify-end font-bold text-zinc-900">
          {parseInt(samples.reduce((acc, sample) => acc + timeToSeconds(sample.sample), 0))}
        </span>
        
      </td>
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
        <span className={`flex justify-end font-bold ${isObj ? 'text-zinc-900' : 'text-zinc-700'} `} >
        {
          parseInt(samples.reduce((acc, sample) => acc + samSeg, 0) )
        }
        </span>
        
      </td>
      <td className="px-1 py-2 border border-gray-300 dark:border-gray-600 text-sm">
           
          <PercentSamplesZones value={
            parseInt( (((samples.reduce((acc, sample) => acc + samSeg, 0)) / 
            (samples.reduce((acc, sample) => acc + timeToSeconds(sample.sample), 0))) * 100))
          }/>
       
      </td>
    </tr>
  )
}

export default LastObjForPolyvalence