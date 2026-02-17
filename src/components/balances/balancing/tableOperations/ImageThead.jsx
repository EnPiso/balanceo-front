import { Avatar, Badge, Tooltip } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa6';
import { useRecoilState } from 'recoil';
import { detailOperOperations } from '../../../../infraestructure/states/states_balancing';
import { checkOpersPosition } from '../../../../infraestructure/states/opers_states';
import { isShowModalZoneSample, zoneOperSampleObj, zonesSamplesDetail } from '../../../../infraestructure/states/states_samples_zones';
import { allOperationsProduct } from '../../../../infraestructure/states/operation_states';

const ImageThead = ({ image, oper }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);

  const [isShowModalZone, setIsShowModalZone] = useRecoilState(isShowModalZoneSample)
    
  const [zoneOperSample, setZoneOperSample] = useRecoilState(zoneOperSampleObj)

  const [zonesDetailSample, setZonesDetailSample] = useRecoilState(zonesSamplesDetail)

  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  

  // Función para abrir y cerrar el lightbox
  const toggleLightbox = () => setIsOpen(!isOpen);

  const handleSampleZone = (oper) => {
    const matchingObject = detailOperOpera.find((item) => item.oper_id === oper.id);
    const opers_balancing_id = matchingObject.detail.opers_balancing_id

    const filtered = detailOperOpera.filter(item => item.detail.opers_balancing_id === opers_balancing_id)

    const ids = filtered.map(item => item.detail.operations_balancing_id)

    const filteredUpdate = operationsProduct.filter(item =>
      ids.includes(item.operation_balancing_id)
    );

    const operations_balancing_id = matchingObject.detail.operations_balancing_id
    const operation = operationsProduct.find(item => item.operation_balancing_id === operations_balancing_id)
    
    const zoneSample = {
      operator: oper,
      operation: operation,
      detailObj: matchingObject
    }

    setZonesDetailSample(filteredUpdate)
    setIsShowModalZone(true)
    setZoneOperSample(zoneSample)
  }

  return (
    <span className='py-1 px-1'>
      <Tooltip content="Click">
        <Badge 
          color="default" 
          content={
            <FaClock 
              onClick={()=> handleSampleZone(oper)}
              className="text-zinc-800"/>
          } 
          shape="circle" 
          showOutline={false}>
            <Avatar  
              onClick={toggleLightbox} 
              radius="full"
              src={image} />
        </Badge>
      </Tooltip>
    
      {isOpen && (
        <div 
          className="lightbox" 
          onClick={toggleLightbox}>
          <span
            className="lightbox-content"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      )}
    </span>
  );
}

export default ImageThead;
