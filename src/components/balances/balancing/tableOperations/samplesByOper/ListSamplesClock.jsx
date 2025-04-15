import React, { useState } from 'react'
import { useEffect } from 'react'
import { fetchGetData } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import { Spinner, Tooltip } from '@nextui-org/react'
import ConfirmDeleteSample from '../samples/ConfirmDeleteSample'
import EditWatchChrono from '../../../../samples/EditWatchChrono'
import { timeToSeconds } from '../../../../../ui/utils'
import LastObjForPolyvalence from '../samples/LastObjForPolyvalence'
import { FaEdit } from 'react-icons/fa'
import DeleteSamplesClock from '../samples/DeleteSamplesClock'
import PercentSamplesZones from '../../../../../ui/PercentageBox '

const ListSamplesClock = (
  {
    samplesClock, 
    setSamplesClock, 
    isSampleClock, 
    isSample, 
    setIsEdit, 
    isEdit, 
    isloadingEdit, 
    isLoading, 
    setIsloading, 
    sampleOperation
    
  }) => {

  const samSeg = isSample.operation.sam_seg


  useEffect(()=> {
    setIsloading(true)
    
    const detail_oper_operation_id = isSample.detail_oper_operation_id
    console.log(detail_oper_operation_id)
    
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}samplings/index_samples_by_detail?detail_oper_operation_id=${detail_oper_operation_id}`);
        setSamplesClock(result.samplings);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsloading(false)
      }
    };
    
    getData();
  }, [isSample])

  

  return (
    <div>

         <div className="overflow-x-auto mt-3">
            <table

              className="min-w-full border border-gray-300 dark:border-gray-600">
              {/* Encabezados */}
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                <tr>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Toma</th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Segundos</th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Meta</th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 flex justify-end"> 
                    <span className="rounded-md bg-zinc-100 py-1 px-1">
                      %
                    </span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              
              
              <tbody>
            

              {samplesClock.map((sample,i)=> {
                return(
                  <>
                      <tr  
                        key={i}
                        className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900 text-gray-900 dark:text-white">
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">
                          {i+1}  
                        </td>
                        
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                            <span className={`flex justify-between items-center cursor-pointer font-bold text-sm`}>
                            <Tooltip content="Editar muestra" placement='right'>
                              <span onClick={() => {
                                setIsEdit(sample)
                                console.log(sample)
                              }} className={`flex justify-between items-center cursor-pointer ${isEdit && isEdit.id === sample.id && 'text-green-700'}`}>
                                {sample.sample}    
                                <div className="hidden lg:block">
                                  <FaEdit 
                                    className='ml-2' 
                                    color='green'/>  
                                </div> 
                                      
                              </span>
                            </Tooltip>

                              <span>
                              {timeToSeconds(sample.sample)}  <small>s</small>
                              </span>      
                                  
                            </span>
                          
                        </td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-bold">
                          <span className="flex justify-end">
                            <span>
                              {samSeg}  <small>s</small>    
                            </span>
                            
                          </span>
                        </td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-bold w-36">
                          
                            <PercentSamplesZones value={Math.round((samSeg / timeToSeconds(sample.sample)) * 100)}/>
                          
                        </td>
                        
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                          
                          <span className="flex justify-end">
                            <DeleteSamplesClock
                              isSample={isSample}
                              sample={sample} 
                              index={i+1} 
                              setSamples={setSamplesClock} 
                              samples={samplesClock}/> 
                          </span>
                          
                        </td>

                        
                      </tr>
                  </>
                )
              })}

              {
                samplesClock.length >= 1 && (
                  <LastObjForPolyvalence
                    samples={samplesClock}
                    samSeg={samSeg}
                    isObj={true}
                  />
                )
              }
              
             
              </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListSamplesClock