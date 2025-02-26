
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { stepsSamples } from '../../../../../infraestructure/states/states_samples'
import { FaEdit } from 'react-icons/fa'
import { FaDeleteLeft, FaTrash } from 'react-icons/fa6'
import { fetchGetData } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import { CircularProgress, Tooltip } from '@nextui-org/react'
import ConfirmDeleteSample from './ConfirmDeleteSample'

const ListSamples = ({obj,setIsEdit, isEdit, isLoadingEdit}) => {

  const [samples, setSamples] = useRecoilState(stepsSamples)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    
    const getData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchGetData(`${urlMain}samplings/index_samples?operation_balancing_id=${obj.operation_balancing_id}&oper_id=${obj.oper_id}`);
        
        setSamples(result.samples);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
      }
    };

    samples.length < 1 && getData();
  }, []);

  return (
    <div>
      {
        isLoading ? (
          <>
            <div className="flex justify-center items-center py-5">
              <CircularProgress aria-label="Loading..." color="success" size="lg"/>
            </div>
          
          </>
        ) : (
          <>
          {samples.map((sample, i) => (
            <div
                key={sample.id}
                className={`flex justify-between items-center p-2 border rounded`}
            > 

              <Tooltip content="Editar muestra">
                <span onClick={() => setIsEdit(sample)} className={`cursor-pointer ${isEdit && isEdit.id === sample.id && 'text-green-700'}`}>
                  {i+1} - {sample.sample}               
                </span>
              </Tooltip>

              
              <div className="flex items-center gap-2">
               
                <ConfirmDeleteSample sample={sample} index={i+1} setSamples={setSamples} samples={samples}/>

                
              </div>
            </div>
          ))}
          </>
        )
      }
      
       
      
      


    </div>
  )
}

export default ListSamples