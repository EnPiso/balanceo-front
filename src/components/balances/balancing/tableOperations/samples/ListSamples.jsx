
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { stepsSamples } from '../../../../../infraestructure/states/states_samples'
import { FaEdit } from 'react-icons/fa'
import { FaDeleteLeft, FaTrash } from 'react-icons/fa6'
import { fetchGetData } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import { CircularProgress, Tooltip } from '@nextui-org/react'
import ConfirmDeleteSample from './ConfirmDeleteSample'
import { timeToSeconds } from '../../../../../ui/utils'
import ObjForPolyvalence from './ObjForPolyvalence'
import LastObjForPolyvalence from './LastObjForPolyvalence'

const ListSamples = ({obj,setIsEdit, isEdit, isLoadingEdit, itemAll}) => {

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


  const handleEdit = (sample) => {
    setIsEdit(sample)
  }

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

          <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-600">
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
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">{""}</th>
                  </tr>
                </thead>
                
                
                <tbody>
                  {samples.map((sample, i)=> {
                    return(
                      <ObjForPolyvalence
                        key={i}
                        sample={sample}
                        setSamples={setSamples}
                        i={i}
                        isEdit={isEdit}
                        handleEdit={handleEdit}
                        samSeg={itemAll.sam_seg}
                        samples={samples} 
                      />
                    
                    )
                  })}

                  {
                    samples.length >= 1 && (
                      <LastObjForPolyvalence 
                        samples={samples}
                        samSeg={itemAll.sam_seg}
                      />
                    )
                  }
                   
                </tbody>
              </table>
          </div>


          </>
        )
      }
      
       
      
      


    </div>
  )
}

export default ListSamples