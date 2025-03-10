import React, { useEffect } from 'react'
import { timeToSeconds } from '../../../../../ui/utils'
import LastObjForPolyvalence from '../samples/LastObjForPolyvalence'

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
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Toma</th>
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Tiempo en segundos</th>
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Meta en segundos</th>
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
                            <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">
                              {i+1}  
                            </td>
                            <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                <span className={`flex justify-between items-center cursor-pointer `}>
                                  {sample.sample}    
                                  <span>
                                  {timeToSeconds(sample.sample)}  
                                  </span>      
                                      
                                </span>
                            
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