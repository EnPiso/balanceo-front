import React, { useState } from 'react'
import { useEffect } from 'react'
import { fetchGetData } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import { Spinner, Tooltip } from '@nextui-org/react'
import ConfirmDeleteSample from '../samples/ConfirmDeleteSample'
import EditWatchChrono from '../../../../samples/EditWatchChrono'

const ListSamplesClock = ({samplesClock, setSamplesClock, isSampleClock, isSample, setIsEdit, isEdit, isloadingEdit}) => {


  useEffect(()=> {
    
    const detail_oper_operation_id = isSample.detail_oper_operation_id
    console.log(detail_oper_operation_id)

    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}samplings/index_samples_by_detail?detail_oper_operation_id=${detail_oper_operation_id}`);
        setSamplesClock(result.samplings);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    
    getData();
  }, [isSample])



  return (
    <div>

     
       {
          samplesClock.map((sample, i)=> {
            return(
              <>
                <div
                  key={i}
                  className={`flex justify-between items-center p-2 mt-1 border rounded bg-zinc-100 hover:bg-zinc-200`}
                  > 
                  
                  
                    <Tooltip content="Editar muestra">
                      <span onClick={() => {
                        setIsEdit(sample)
                        console.log(sample)
                      }} className={`cursor-pointer ${isEdit && isEdit.id === sample.id && 'text-green-700'}`}>
                        {i+1} - {sample.sample}               
                      </span>
                    </Tooltip>
                  
                    <div className="flex items-center gap-2">
                      <ConfirmDeleteSample 
                        sample={sample} 
                        index={i+1} 
                        setSamples={setSamplesClock} 
                        samples={samplesClock}/>
                    </div>
                </div>
              
              </>
            )
          })
        }
    </div>
  )
}

export default ListSamplesClock