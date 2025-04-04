import React, { useEffect } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'
import { fetchGetData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { useRecoilState } from 'recoil';
import { samplingsCircleList } from '../../../../../infraestructure/states/states_mobile';
import { timeToSeconds } from '../../../../../ui/utils';
import SamplesGlobalDelete from './SamplesGlobalDelete';
import SamplesGlobalFooter from './SamplesGlobalFooter';

const SamplesGlobalList = () => {

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [samplingsCircle, setSamplingsCircle] = useRecoilState(samplingsCircleList);


  useEffect(()=> {
    const balancing_id = objBalancing.balancing_id
    
    const getData = async () => {
          try {
            const result = await fetchGetData(`${urlMain}samplings_cycles?balancing_id=${balancing_id}`);
            console.log(result)
            setSamplingsCircle(result)
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          }
        };
    
        getData();
  }, [])

  return (
    <div>
      
        <table className="min-w-full border border-gray-300 dark:border-gray-600">
             {
              samplingsCircle.length >= 1 && 
                <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Ciclo</th>
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Segundos</th>
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">{""}</th>
                  </tr>
                </thead>  
             }
          
          <tbody>
            {
              samplingsCircle.map((sampling, i)=> {
                return(
                  <tr key={i} className="border border-gray-300 dark:border-gray-600">
                    <td className="px-4 py-2 border-l-1">
                        <span className="flex justify-center text-zinc-800 font-bold">
                          { i + 1 }
                        </span>
                    </td>
                    <td className="px-4 py-2 border-l-1">
                      <span className="flex justify-between items-center font-bold">
                        <span className=" text-zinc-800">
                          { sampling.sample }
                        </span>
                        <span className="text-secondary_two">
                          {timeToSeconds(sampling.sample)}  <small>s</small>
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-2 border-l-1">
                      <SamplesGlobalDelete
                        sampling={sampling}
                        index={ i + 1 }
                      />
                    </td>
                  </tr>
                )
              })
            }
           
          </tbody>
        </table>
        {
          
          samplingsCircle.length >= 1 &&
            <div className="py-5">
              <SamplesGlobalFooter/>
            </div>
        }
        
        
    </div>
  )
}

export default SamplesGlobalList