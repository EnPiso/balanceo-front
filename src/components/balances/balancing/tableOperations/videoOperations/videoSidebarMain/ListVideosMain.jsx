import React, { useEffect, useState } from 'react'
import { fetchGetData } from '../../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../../infraestructure/data/const';
import { FaPlay } from 'react-icons/fa';
import VideoObjMain from './VideoObjMain';
import { CircularProgress } from '@nextui-org/react';

const ListVideosMain = () => {

  const [operationsVideos,setOperationsVideos] = useState([])
  const [operationTemp, setOperationTemp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchGetData(`${urlMain}videos/index_videos`);
        // console.log(result)
        setOperationsVideos(result)
        setIsLoading(false)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getData();
  }, [])

  return (
  
    <div className="space-y-8">
      <div className="overflow-x-auto">
    {
      isLoading ? 
                <span className="flex justify-center items-center h-30">
                  <CircularProgress size="lg" color="success" />
                </span> :
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="dark:bg-zinc-100 bg-zinc-800">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">
                      Operación
                    </th>
                  
                  </tr>
                  
                  </thead>
                  <tbody>
                  
                    {operationsVideos.map((operation, i) => {
            
                      return (
                        <VideoObjMain 
                          operationTemp={operationTemp}
                          setOperationTemp={setOperationTemp}
                          operation={operation} 
                          key={i}/>
                      );
                    })}
                  
                  </tbody>
                </table>
    }

       
      </div>
    </div>
  )
}

export default ListVideosMain