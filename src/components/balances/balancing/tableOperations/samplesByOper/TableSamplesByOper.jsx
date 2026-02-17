import React, { useEffect } from 'react'
import { timeToSeconds } from '../../../../../ui/utils'
import LastObjForPolyvalence from '../samples/LastObjForPolyvalence'
import PercentSamplesZones from '../../../../../ui/PercentageBox'
import TagCreateUserName from '../../../../../ui/TagCreateUserName'

const TableSamplesByOper = ({
  samples,
  handleSample, 
  sampleOperation,
  samSeg
}) => {

  useEffect(()=> {
    
  }, [])

  return (
    <div>
       <div className="overflow-x-auto mt-3">
              <table
               
                onClick={()=> handleSample(sampleOperation)}
                className="min-w-full border border-gray-300 dark:border-gray-600">
                {/* Encabezados */}
                <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-start">Toma</th>
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Segundos</th>
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Metas</th>
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 flex justify-end"> 
                      <span className="rounded-md bg-zinc-100 py-1 px-1">
                        %
                      </span>
                    </th>
                    
                  </tr>
                </thead>
                
                
                <tbody>
                {samples.map((sample, i)=> {
                    return(
                        <>
                          <tr  
                            key={i}
                            className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900 text-gray-900 dark:text-white">
                            <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                              <span className="text-start">
                                <span className="mr-2 font-bold">
                                  {i+1}  
                                </span>
                                <span className="">
                                  {sample.user_name && <TagCreateUserName user_name={sample.user_name}/>}
                                </span>
                              </span>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                <span className={`flex justify-between items-center cursor-pointer text-sm font-bold`}>
                                  
                                  {sample.sample}    
                                  <span>
                                  {timeToSeconds(sample.sample)}  <small>s</small>
                                  </span>      
                                      
                                </span>
                            
                            </td>
                            <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                              <span className="flex justify-end  font-bold">
                                <span>
                                  {samSeg} <small>s</small>
                                </span>
                                
                              </span>
                            </td>
                            <td className="px-1 py-2 border border-gray-300 dark:border-gray-600">
                              <PercentSamplesZones value={Math.round((samSeg / timeToSeconds(sample.sample)) * 100)}/>
                            
                            </td>
                            
                          </tr>
                         
                            
                      
                        </>
                    )
                  })}

              
                    <LastObjForPolyvalence
                      samples={samples}
                      samSeg={samSeg}
                      isObj={false}
                    />
               
                </tbody>
              </table>
          </div>

    </div>
  )
}

export default TableSamplesByOper