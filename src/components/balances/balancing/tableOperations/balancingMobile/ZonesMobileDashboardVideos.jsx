import React, { useEffect, useState } from 'react';
import { FaFileVideo, FaRecordVinyl, FaUser } from 'react-icons/fa6';
import { zonesMobile } from '../../../../../infraestructure/states/states_mobile';
import { checkOpersPosition } from '../../../../../infraestructure/states/opers_states';
import { useRecoilState } from 'recoil';
import { Avatar, Badge } from '@nextui-org/react';
import { FaCheck, FaClock, FaRegPlayCircle } from 'react-icons/fa';
import ZonesMobileClock from './ZonesMobileClock';
import ZonesMobileClockOper from './ZonesMobileClockOper';
import { allOperationsProduct } from '../../../../../infraestructure/states/operation_states';
import { checkOperationsBalancing, listVideosOperations, listVideosOpers, videoOperation, videoShow, modalInputAdd } from '../../../../../infraestructure/states/states_videos';
import { fetchGetData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import TrDinamycVideo from '../videoOperations/TrDinamycVideo';
import ButtonNavigationVideos from '../videoOperations/ButtonNavigationVideos';
import ZoneDinamycVideo from './ZoneDynamicVideo';
import ModalVideoInput from '../videoOperations/ModalVideoInput';
import ButtonRecVideoMobile from './ButtonRecVideoMobile';


const ZonesMobileDashboardVideos = () => {
  const [zonesOperUpdate] = useRecoilState(zonesMobile);
  const [selectedOperDetails] = useRecoilState(checkOpersPosition);

  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)

  const [videosOperations, setVideosOperations] = useRecoilState(listVideosOperations)
  const [OpersTags, setOpersTags] = useRecoilState(listVideosOpers)
  const [videoObjOperation, setVideoObjOperation] = useRecoilState(videoOperation)
  const [showVideos, setShowVideos]  = useRecoilState(videoShow)
  const [selOpeVideos, setSelOpeVideos] = useRecoilState(checkOperationsBalancing);

  const [isModalInput,setIsModalInput] = useRecoilState(modalInputAdd)


  useEffect(()=> {
    setIsModalInput(false)
    setShowVideos(false)
  }, [])
 
  const handleOperation = (item) => {

    setVideoObjOperation(null)
    
    if(showVideos && showVideos.id === item.id){
      setShowVideos(false)
      setVideosOperations([])
      setOpersTags([])

    }else{
      setShowVideos(item)
      // console.log(item.operation_balancing_id)
      handleApi(item.operation_balancing_id)
    }

  }

    const handleApi = (operation_balancing_id) => {

      const getData = async (operation_balancing_id) => {
        try {
          //setLoading(true);
          const result = await fetchGetData(`${urlMain}/videos/show_videos?operation_balancing_id=${operation_balancing_id}`);
          console.log(result)
          setVideosOperations(result.videos)
          setOpersTags(result.opers_balancings)
          //setOrders(result)
          //setError(null);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          setVideosOperations([])
          setOpersTags([])
  
        } finally {
          //setLoading(false);
        }
      };
  
      getData(operation_balancing_id);
    }

    const handleOperationBalancing = (item) => {
    
      setSelOpeVideos(item)
      setShowVideos(item)
      setIsModalInput(true)
    }

    

  return (
    <div>
        {
          operationsProduct.map((operation, i)=> {
           return(
              <div 
                key={i} 
                className={`mt-4 shadow-lg bg-zinc-200  ${showVideos && showVideos.id === operation.id && ' border-b-5 border-secondary_two' }`}
                style={{
                  borderRight: '6px solid #80B7AE'
                }}
              >
                <div className='p-3 mt-2'>
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 
                        className={`font-medium  uppercase ${showVideos && showVideos.id === operation.id ? 'text-secondary_two ' : 'text-zinc-800'}`}>
                          <span className={`${showVideos && showVideos.id === operation.id && ' bg-zinc-200' }`}>
                            {operation.operation}
                          </span>
                        
                        
                      </h1>

                      <div className="flex justify-between items-start">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p>Máquina: {operation.machine}</p>
                          <p>Minutos: {operation.sam} </p>
                        </div>   
                      </div> 
                    </div>

                    <div className='flex flex-col'>
                      <button
                        onClick={()=> handleOperation(operation)}>
                        <Badge
                          shape="rectangle" 
                          showOutline={false}
                          content={operation.video_count >= 1 && operation.video_count} 
                          className="mt-6 bg-secondary_two">
                          <FaRegPlayCircle size={45} className='text-secondary_two'/>
                        </Badge>
                      </button>

                      <button
                        className="mt-2"
                        onClick={()=> {
                          handleOperationBalancing(operation)
                          setShowVideos(operation)
                          // console.log(item.operation_balancing_id)
                          handleApi(operation.operation_balancing_id)
                        }}>
                        <FaFileVideo
                          size={45}
                          className='text-secondary_two'
                        />
                      </button>
                      <ButtonRecVideoMobile
                        operation={operation}
                      />
                    </div>
                    
                    

                   
                  </div>

                  

                  
                </div>

                {
                  showVideos && operation && (showVideos.id === operation.id) && (
                    <>
                      <ZoneDinamycVideo
                        item={operation}
                        showVideos={showVideos}/>
                    </>
                  )
                }
                {
                  videosOperations.length >= 1 && OpersTags.length >= 1 && <ButtonNavigationVideos showVideos={showVideos} item={operation}/>
                }

               
             </div>
           )  
          })
        }
       
       


    </div>
  );
};

export default ZonesMobileDashboardVideos;