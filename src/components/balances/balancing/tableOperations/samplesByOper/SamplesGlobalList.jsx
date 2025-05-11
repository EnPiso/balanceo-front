import React, { useEffect } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'
import { fetchGetData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { useRecoilState } from 'recoil';
import { loadingSamplingsCircle, samplingsCircleList } from '../../../../../infraestructure/states/states_mobile';
import { formatClockToFloat, timeToSeconds } from '../../../../../ui/utils';
import SamplesGlobalDelete from './SamplesGlobalDelete';
import SamplesGlobalFooter from './SamplesGlobalFooter';
import { Spinner } from '@nextui-org/react';
import PercentSamplesZones from '../../../../../ui/PercentageBox';

const SamplesGlobalList = () => {

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [samplingsCircle, setSamplingsCircle] = useRecoilState(samplingsCircleList);
  const [isLoadingSamplings, setIsLoadingSamplings] = useRecoilState(loadingSamplingsCircle)


  useEffect(()=> {
    const balancing_id = objBalancing.balancing_id
    setIsLoadingSamplings(true)
    const getData = async () => {
          try {
            const result = await fetchGetData(`${urlMain}samplings_cycles?balancing_id=${balancing_id}`);
            console.log(result)
            setSamplingsCircle(result)
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          } finally {
            setIsLoadingSamplings(false)
          }
        };
    
        getData();
  }, [])
  
    

  const formatPercent = (sample) => {

    // Total SAM promedio por operador (en segundos)

    const totalTiming = parseFloat((objBalancing.total_sam).toFixed(2));

    // Convertir sample recibido a segundos
    const realTiming = parseFloat(formatClockToFloat(sample)); // sample viene como string tipo "2:56"
    
    // Calcular el porcentaje de eficiencia
    return (totalTiming / realTiming) * 100;
    
    
  }

  const timeToDecimalMinutes = (timeStr) => {
    const [minutesStr, secondsStr] = timeStr.split(':');
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);
  
    return +(minutes + (seconds / 60)).toFixed(2);

  }

  return (
    <div>
      {
        isLoadingSamplings ? 
            <div className="flex items-center justify-center h-full">
              <Spinner size="lg" color="default"/>
            </div> :
           <div>
               <table className="min-w-full border border-gray-300 dark:border-gray-600">
                {
                  samplingsCircle.length >= 1 && 
                    <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                      <tr>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Ciclo</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Segundos</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">{""}</th>
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
                              { timeToDecimalMinutes(sampling.sample) }
                            </span>
                            <small className="text-secondary_two font-bold">
                              {timeToSeconds(sampling.sample)}  <small>s</small>
                            </small>
                          </span>
                        </td>
                        <td className="px-1 py-2 border-l-1 w-32">
                         
                          <PercentSamplesZones value={formatPercent(sampling.sample)} />  
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
           </div>

      }
       
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