import React from 'react'
import {FaArrowTurnDown, FaClosedCaptioning, FaPlay} from "react-icons/fa6";
import {fetchGetData} from "../../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {
  listVideosOperations,
  listVideosOpers,
  videoOperation
} from "../../../../../infraestructure/states/states_videos.js";

const ButtonPlayVideos = ({item,showVideos,setShowVideos}) => {

  const [videosOperations, setVideosOperations] = useRecoilState(listVideosOperations)
  const [OpersTags, setOpersTags] = useRecoilState(listVideosOpers)
  const [videoObjOperation, setVideoObjOperation] = useRecoilState(videoOperation)


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


  return (
    <button onClick={()=> handleOperation(item)} className="mr-5">
      {
        showVideos && showVideos.id === item.id ? <FaArrowTurnDown/> : <FaPlay/>
      }
    </button>
  )
}
export default ButtonPlayVideos
