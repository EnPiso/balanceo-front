import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { checkOpersPosition, selectOpers } from '../../../../../infraestructure/states/opers_states';
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { urlMain } from '../../../../../infraestructure/data/const';
import { updateData } from '../../../../../infraestructure/call_api/crud';
import toast from 'react-hot-toast';
import SelectOperCheck from './SelectOperCheck';
import { FaUser } from 'react-icons/fa';
import { Tooltip } from '@nextui-org/react';

const SelectionOperVideo = ({ video, setVideosOperations, videosOperations }) => {
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  const [selected, setSelected] = useState(null);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);


  useEffect(()=> {
    if(video && video.operations_balancing_id >= 1 && video.oper_id >= 1 ){
      const oper = selectedOperDetails.find(item => item.id === video.oper_id)
      setSelected(oper)
    }
  }, [])

  const handleOperVideo = (oper, setIsLoading) => {
    setSelected(oper);

    const oper_id = oper.id;
    const balancing_id = objBalancing.balancing_id;
    const video_id = video.id;

    const data = {
      video: {
        oper_id: oper_id,
        balancing_id: balancing_id,
      },
    };

    console.log(data);

    const updateVideoOper = async () => {
      setIsLoading(true)
      try {
        const result = await updateData(`${urlMain}videos/${video_id}/video_oper`, data);
        console.log(result);
        const updateItem = () => {
          return videosOperations.map(item => 
            item.id === result.id ? { ...item, ...result } : item
          );
        };
        setVideosOperations(updateItem)

        toast.success("Se ha actualizado el operario en el vídeo correctamente")

      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false)
      }
    };

    updateVideoOper();
  };

  return (
    <>

        <div className='bg-zinc-300 py-2'>
            <h1 className="px-4 flex justify-between items-center  font-bold mb-1 text-zinc-600 text-md underline underline-offset-2">
              Seleccionar operario <FaUser size={15} className='ml-2' color='green'/>
            </h1>
              <div className="flex gap-2 flex-wrap py-2 px-2">
                
                {selectedOperDetails.map((oper, index) => (
                  <SelectOperCheck
                    key={index}
                    oper={oper}
                    selected={selected}
                    handleOperVideo={handleOperVideo}
                    />
                ))}
              </div>

        </div>
     
    </>
  );
};

export default SelectionOperVideo;