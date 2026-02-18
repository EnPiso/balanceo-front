import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from "recoil";
import { listVideosOpers, videoOperation } from '../../../../../infraestructure/states/states_videos';
import { fetchGetData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import DraggableVideo from '../videoOperations/DraggableVideo';
import { formatDateRails } from '../../../../../ui/utils';
import CommentVideoInput from '../videoOperations/CommentVideoInput';
import { FaPlay } from 'react-icons/fa6';
import ZoneVideo from './ZoneVideo';


const ZoneDinamycVideo = ({item}) => {
  const [videoObjOperation, setVideoObjOperation] = useRecoilState(videoOperation);
  const videoRef = useRef(null); // Referencia al elemento <video>
  const [OpersTags, setOpersTags] = useRecoilState(listVideosOpers)

  const [commentsVideos, setCommentsVideos] = useState([])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Recarga el video cada vez que cambia el estado
    }
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}/videos/${videoObjOperation.id}/comment_videos`);

        setCommentsVideos(result)
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    videoObjOperation && getData();
  }, [videoObjOperation]);




  return (
    <div className="w-full">
      <div className="py-2 px-2 container w-full">


        {
          videoObjOperation ? ( 
            <>
             
              {
                videoObjOperation && <ZoneVideo
                  videoObjOperation={videoObjOperation}
                  setVideoObjOperation={setVideoObjOperation}
                  videoRef={videoRef}
                />
              }
              <h2 className="text-lg font-bold uppercase mb-2 text-zinc-800">Comentarios</h2>
              {
                commentsVideos.map((comment, i)=> {
                  return(
                    <div key={i} className="bg-zinc-100 p-1 rounded-lg shadow my-2 px-2">
                      <p className="text-sm text-zinc-600 mt-2 capitalize">
                        {
                          comment.comment
                        }
                      </p>
                      <p className="text-end font-bold ">
                        <small className='text-primary_one px-1 bg-zinc-200 rounded-lg'>
                          {
                            formatDateRails(comment.created_at)
                          }
                        </small>
                      </p>

                    </div>
                  )
                })
              }


             <CommentVideoInput
               commentsVideos={commentsVideos}
               setCommentsVideos={setCommentsVideos}
               key={`${JSON.stringify(videoObjOperation)}`}
             />


            </>


          ) : (
            <div className="px-2 py-2 flex  justify-start">
              <button
                className="w-12 h-12 flex justify-center items-center focus:outline-none  transition-colors"
                
              >
                <FaPlay
                  className="h-4 w-4"
                />
              </button>
              <p className="mt-3 font-bold capitalize">
                {
                  item && item.video_count > 1 ? (
                    <>
                      Selecciona vídeos {item && item.video_count}
                    </>
                  ) : (
                    <>
                     Selecciona vídeo {item && item.video_count}
                    </>
                  )
                }
                
              </p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ZoneDinamycVideo;
