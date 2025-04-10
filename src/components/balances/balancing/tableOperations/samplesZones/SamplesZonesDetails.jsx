import React from 'react'
import { useRecoilState } from 'recoil'
import { zonesSamplesDetail } from '../../../../../infraestructure/states/states_samples_zones'
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states'
import { checkOpersPosition, selectOpers } from '../../../../../infraestructure/states/opers_states'
import { FaUser, FaUserCircle } from 'react-icons/fa'
import { Badge } from '@nextui-org/react'


const SamplesZonesDetails = () => {
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [zonesDetailSample, setZonesDetailSample] = useRecoilState(zonesSamplesDetail)

  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  

  return (

      <div className="mt-4 ">  
        <div className="py-1 mb-3">
          <h3 className="font-bold text-xl uppercase text-secondary_two lg:text-md flex justify-between items-center">
            <span className="bg-zinc-100">
              {"  " + objBalancing.product.name}
            </span>
            <span>
            <Badge content={selectedOperDetails.length} shape="circle">
              <FaUserCircle className="text-primary_one" size={25}/>  
            </Badge>
              
            </span>
          </h3>
          <h3 className="font-bold text-md capitalize text-secondary_two lg:text-md flex justify-between items-center mt-1">
            <span className="bg-zinc-100">
              Sam total: 
            </span>
            <span className="bg-zinc-100">
              {objBalancing.total_sam}
            </span>
          </h3>
         
        </div>
      
      <div className=" py-2 bg-zinc-100 rounded-md my-3">
        <h3 className="font-bold uppercase text-secondary_two text-md lg:text-md">
          Operaciones 
        </h3>
        <p className=" lowercase text-zinc-800 ">
          <span className="bg-zinc-100">
            {zonesDetailSample.map((operation) => operation.operation).join(", ")}
          </span>
        </p>
        <h3 className="font-bold text-md capitalize text-secondary_two lg:text-md flex justify-start mt-1">
          <span className="bg-zinc-100">
            Tiempo: {(objBalancing.total_sam / selectedOperDetails.length).toFixed(2)} 
          </span>
         
        </h3>
      </div>
      
    </div>
  )
}

export default SamplesZonesDetails