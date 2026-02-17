import React, { useState } from 'react'
import ListZonesByZone from './ListZonesByZone'
import MyCustomButton from '../../../../../../ui/MyCustomButton'
import { FaClock, FaPlay } from 'react-icons/fa6'
import ListZonesCycles from './ListZonesCycles'
import { isCycleList } from '../../../../../../infraestructure/states/states_samples'
import { useRecoilState } from 'recoil'
import { currentUser } from '../../../../../../infraestructure/states/states_views'

const ZonesByZoneDashboard = () => {
  
  const [isCycleCreate, setIsCycleCreate] = useRecoilState(isCycleList)

  const [user, setUser] = useRecoilState(currentUser);


  return (
    <>
      <div>
        <div className="flex justify-between items-center font-bold ">
            <div className="flex justify-start">
              <MyCustomButton
                  icon={!isCycleCreate && <FaClock className='mt-1 mr-1 text-secondary_two'/>}
                  title={"Ciclos actuales"}
                  handleClick={()=> setIsCycleCreate(false)}
                  value={null}
                  bgButton={!isCycleCreate ? "bg-primary_one" : "bg-zinc-200"}
                  textButton={!isCycleCreate ? "text-secondary_two" : "text-zinc-800"}
                />
                
            </div>
            {
              user && (user.role === 'admin' || user.role === 'supervisor') && 
                <MyCustomButton
                  icon={isCycleCreate && <FaPlay className='mt-1 mr-1 text-secondary_two'/>}
                  title={"Tomar muestras"}
                  handleClick={()=> setIsCycleCreate(true)}
                  value={null}
                  bgButton={isCycleCreate ? "bg-primary_one" : "bg-zinc-200"}
                  textButton={isCycleCreate ? "text-secondary_two" : "text-zinc-800"}/>
            }
        </div> 
          
       
      </div>
      <hr className="border-zinc-100 shadow-lg" />
      {
        isCycleCreate ?
          <ListZonesByZone/> :
          <ListZonesCycles/>
      }
    </>
  )
}

export default ZonesByZoneDashboard