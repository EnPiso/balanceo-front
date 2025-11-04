import React, { useEffect, useState } from 'react'

import { zoneOperSampleObj, zonesSamplesList } from '../../../../../infraestructure/states/states_samples_zones';
import { useRecoilState } from 'recoil';
import { timeToSeconds } from '../../../../../ui/utils';
import { fetchGetData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import SamplesZoneDelete from './SamplesZoneDelete';
import { CircularProgress } from '@nextui-org/react';
import PercentSamplesZones from './PercentSamplesZones';
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { zoneCyclesList } from '../../../../../infraestructure/states/states_samples';
import SelectOpersForTimes from './SelectOpersForTimes';
import { currentUser } from '../../../../../infraestructure/states/states_views';
import TagCreateUserName from '../../../../../ui/TagCreateUserName';

const SamplesZonesList = ({opersBalancingId}) => {
  const [zonesSamples, setZonesSamples] = useRecoilState(zonesSamplesList)
  const [zoneOperSample, setZoneOperSample] = useRecoilState(zoneOperSampleObj)

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  
  const [zonesCycles, setZonesCycles] = useRecoilState(zoneCyclesList);

  const [isLoading, setIsLoading] = useState(true);

  const [isZonesSamples, setIsZonesSamples] = useState(false);
  const [user, setUser] = useRecoilState(currentUser);


  useEffect(()=> {
    
    const getData = async () => {
    const opers_balancing_id = zoneOperSample.detailObj.detail.opers_balancing_id
      setIsLoading(true)
      try {
        const result = await fetchGetData(`${urlMain}opers_zones?opers_balancing_id=${opers_balancing_id}`);
        
        setZonesSamples(result)
        setIsLoading(false)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } 
    };

    if(zoneOperSample){
      setIsZonesSamples(true)
      getData()
    } else{
      setIsLoading(true)
    }
  }, [])

  useEffect(()=> {
    if(opersBalancingId >= 1){
      getApiSample()
    } 
  },[opersBalancingId])
  
  const getApiSample = () => {
    const getApi = async () => {
      setIsLoading(true)
      const opers_balancing_id = opersBalancingId
    
      try {
        const result = await fetchGetData(`${urlMain}opers_zones?opers_balancing_id=${opers_balancing_id}`);
        
        setZonesSamples(result)
        setIsZonesSamples(true)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
  
      }
    };
    getApi();
  }
  
      

  return (
    <div>
      {
        isZonesSamples &&
        <table className={`min-w-full ${!isLoading && 'border border-gray-300 dark:border-gray-600'} `} >
        {
          zonesSamples.length > 0 && 
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              <tr>
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-start">Ciclo</th>
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">Segundos</th>
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">{""}</th>
                {
                  user && (user.role === 'admin' || user.role === 'supervisor') &&
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">{""}</th>
                }
                
              </tr>
            </thead>  
        }
         
       {
        isLoading ? 
          <div className="flex justify-center items-center h-96">
            <CircularProgress size='lg' color='default'/>  
          </div> :
          <tbody>
            {
              zonesSamples.map((sampling, i)=> {
                return(
                  <tr key={i} className="border border-gray-300 dark:border-gray-600">
                    <td className="px-4 py-2 border-l-1">
                        <span className="text-zinc-800">
                          <span className="text-start">
                            <span className="mr-2 font-bold">
                              {i+1}  
                            </span>
                            <span className="">
                              {sampling.user_name && <TagCreateUserName user_name={sampling.user_name}/>}
                            </span>
                              </span>
                        </span>
                    </td>
                    <td className="px-4 py-2 border-l-1">
                      <span className="flex justify-between items-center font-bold">
                        <span className=" text-zinc-800">
                          {sampling.sample}
                        </span>
                        <span className="text-secondary_two">
                          {timeToSeconds(sampling.sample)}  <small>s</small>
                        </span>
                      </span>
                    </td>
                    <td className="px-1 py-2 border-l-1  w-36">
                        <PercentSamplesZones 
                          sample={sampling.sample}
                        />
                     
                    </td>
                    {
                      user && (user.role === 'admin' || user.role === 'supervisor') &&
                        <td className="px-4 py-2 border-l-1">
                          <span className="flex justify-end">
                            <SamplesZoneDelete
                              index={ i + 1 }
                              sample={sampling}/>
                          </span>
                        </td>
                    }
                    
                  </tr>
                )
              })
            }
        
          </tbody>
      }
     
    </table> 
    }
         
           
    </div>
  )
}

export default SamplesZonesList