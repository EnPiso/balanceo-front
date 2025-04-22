import React, { useState, useEffect } from 'react';
import { FaClockRotateLeft, FaFileVideo, FaPlay, FaUser, FaUserClock, FaVideo } from 'react-icons/fa6';
import { clockGlobalModal, clockZoneByZoneModal, samplingsCircleList, samplingsCircleObj, zonesMobile } from '../../../../../infraestructure/states/states_mobile';
import { checkOpersPosition } from '../../../../../infraestructure/states/opers_states';
import { useRecoilState } from 'recoil';
import { Avatar, Badge, CircularProgress, Spinner } from '@nextui-org/react';
import { FaClock, FaTimes, FaTimesCircle } from 'react-icons/fa';
import ZonesMobileClock from './ZonesMobileClock';
import ZonesMobileClockOper from './ZonesMobileClockOper';
import MyCustomButton from '../../../../../ui/MyCustomButton';
import ZonesMobileDashboardVideos from './ZonesMobileDashboardVideos';
import { isVideosShow, videoShow } from '../../../../../infraestructure/states/states_videos';
import ModalVideoInput from '../videoOperations/ModalVideoInput';
import FooterCycles from '../FooterCycles';
import ZonesMobileZoneTime from './ZonesMobileZoneTime';
import { fetchGetData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { zoneCyclesList } from '../../../../../infraestructure/states/states_samples';
import SecuentialZone from './SecuentialZone';


const ZonesMobileDashboard = () => {
  const [zonesOperUpdate] = useRecoilState(zonesMobile);
  const [selectedOperDetails] = useRecoilState(checkOpersPosition);

  const [isVideos,setIsVideos] = useRecoilState(isVideosShow)
  
  const [showVideos, setShowVideos]  = useRecoilState(videoShow)

  const [clockGlobal, setClockGlobal]  = useRecoilState(clockGlobalModal)

  const [samplingsGlobal, setSamplingsGlobal] = useRecoilState(samplingsCircleObj)
  
  const [samplingsCircle, setSamplingsCircle] = useRecoilState(samplingsCircleList);

  const [zoneByZoneModal, setZoneByZoneModal]  = useRecoilState(clockZoneByZoneModal)
  
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  
  const [zonesCycles, setZonesCycles] = useRecoilState(zoneCyclesList);

  const [isLoading, setIsLoading] = useState(false)
  

  const handleGlobalClock = () => {
    setClockGlobal(!clockGlobal)
  }
  
  return (
    <div>
      <div className="flex justify-between items-center font-bold ">
          <div className="flex justify-start">
            <MyCustomButton
                icon={!isVideos && <FaClock className='mt-1 mr-1 text-secondary_two'/>}
                title={"TOMA DE TIEMPOS"}
                handleClick={()=> setIsVideos(false)}
                value={null}
                bgButton={!isVideos ? "bg-zinc-800" : "bg-zinc-200"}
                textButton={!isVideos ? "text-secondary_two" : "text-zinc-800"}
              />
             
             <div>
                { 
                !isVideos && !samplingsGlobal && 
                  <div className="flex mt-2 ml-4 justify-between items-center relative">
                    <button onClick={handleGlobalClock} className="relative">
                      <FaClock
                        className="w-11 h-11 rounded-full object-cover text-primary_one"
                        style={{
                          border: `6px solid #80B7AE`, // Azul personalizado con 6px de grosor
                        }}
                      />
                      <span className="absolute bottom-0 left-6 w-8 h-8 flex items-center justify-center rounded-full">
                        <img
                          className="w-full h-full object-contain"
                          src="https://balance-assets.sfo3.digitaloceanspaces.com/assets/shirt.png"
                          alt="shirt"
                        />
                      </span>
                    </button>
                  </div>
                  
                }
              </div>
          </div>
          
          <MyCustomButton
            icon={isVideos && <FaPlay className='mt-1 mr-1 text-secondary_two'/>}
            title={"VÍDEOS"}
            handleClick={()=> setIsVideos(true)}
            value={null}
            bgButton={isVideos ? "bg-zinc-800" : "bg-zinc-200"}
            textButton={isVideos ? "text-secondary_two" : "text-zinc-800"}
          />
       
      </div>  



          <div className="mt-2 flex justify-between items-center">
             
              
              <div>
              {
                !isVideos && 
                  <>
                  {
                    isLoading ?
                      <CircularProgress 
                        size='lg' 
                        color='default' 
                        className=''/> : 
                      <SecuentialZone
                        setIsLoading={setIsLoading}
                      />
                  
                        
                  }
                    
                  </>
                 
              }
              </div>

          </div>


      {




        isVideos ? <ZonesMobileDashboardVideos/> : (
          <div>
            {
              samplingsGlobal && 
                <FooterCycles 
                  handleFunction={handleGlobalClock}/>
            }
            

          {zonesOperUpdate.map((zone, zoneIndex) => (
            <div 
              key={zoneIndex} 
              className="mt-4 shadow-lg"
              style={{
                borderRight: '6px solid #80B7AE'
              }}
            >
              
              <div>
                {zone.map((operationDetail, opIndex) => (
                  <div key={opIndex}
                  className='bg-zinc-200'
                  style={{
                    // background: operationDetail.operation.is_repeat
                    //   ? `linear-gradient(to bottom,
                    //      ${operationDetail.operation.color[opIndex < 1 ? 0 : 1]}, 
                    //      ${operationDetail.operation.color[opIndex < 1 ? 1 : 0]}), rgba(0, 0, 0, 0.06)`
                    //   : operationDetail.operation.color,
                    backgroundBlendMode: operationDetail.operation.is_repeat ? "multiply" : "normal",
                    borderRight: operationDetail.operation.is_repeat
                      ? `6px solid ${operationDetail.operation.color[opIndex < 1 ? 0 : 1]}`
                      : `6px solid ${operationDetail.operation.color}`,
                  }}
                  > 
                    <div className="p-3 border mt-2">
                      
                    {opIndex < 1 && zone[0] && zone[0].operator && zone[0].detailObj && (
                      <div className="flex justify-between items-center relative">
                        <div className="flex flex-col">
                          <h3 className="text-lg mb-3 text-secondary_two uppercase font-black">
                            <span className="bg-primary_one px-1 rounded-md">
                              {zone[0].operator.name}
                            </span>
                            
                          </h3>
                          <ZonesMobileZoneTime
                            operationDetail={operationDetail}
                          />
                        </div>
                        

                        <div className="relative">
                          <ZonesMobileClockOper
                            zone={zone}
                          />

                        </div>
                       
                      </div>
                    )}
  
  
                      <div className="pt-4">
                          
                        <p className="font-medium">
                          {operationDetail.operation.operation}
                        </p>
    
                        <div className="flex justify-between items-start">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              <p>Máquina: {operationDetail.operation.machine}</p>
                              <p>Minutos: {operationDetail.detailObj && operationDetail.detailObj.detail.minutes} </p>
                            </div>
                          <pre className="text-xs text-gray-500">
                            {// JSON.stringify(operationDetail.detailObj.detail.samplings_count, null, 2)}
        } 
                          <ZonesMobileClock
                            operationDetail={operationDetail}
                            zone={zone}
                            opIndex={opIndex}
                          />
                        
                            
                            
                          </pre>
                        </div>
                      </div>
                      
                    </div>
  
                  </div>
                ))}
              
              </div>
            </div>
          ))}
        </div>
        )
      }
     
    </div>
  );
};

export default ZonesMobileDashboard;