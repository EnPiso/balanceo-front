import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from "recoil";
import {listVideosOpers, videoOperation} from "../../../../../infraestructure/states/states_videos.js";
import {TagButton} from "../../../../../ui/TagButton.jsx";
import {FaPlay} from "react-icons/fa6";
import DraggableVideo from "./DraggableVideo.jsx";
import WebcamComponent from "../videoRecCamera/WebcamComponent.jsx";
import CustomButton from "../../../../../ui/CustomButton.jsx";
import {FaSave} from "react-icons/fa";
import CommentVideoInput from "./CommentVideoInput.jsx";
import {fetchGetData} from "../../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../../infraestructure/data/const.js";
import {formatDateRails} from "../../../../../ui/utils.js";

const TrDinamycVideo = ({item}) => {
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
    <tr className="border border-zinc-50 w-full">
      <td className="py-2 px-2 container w-full">


        {
          videoObjOperation ? ( 
            <>
             {/*<div className="px-2 py-2">
               {
                 OpersTags.map((oper, i)=> {
                   return(
                     <TagButton
                       key={i}
                       label={oper.name}
                       onClose={()=> console.log("select")}
                     />
                   )
                 })
               }

             </div>*/}

          
              {
                videoObjOperation && <DraggableVideo
                  videoRef={videoRef}
                  videoObjOperation={videoObjOperation}
                  setVideoObjOperation={setVideoObjOperation}
                />
              }

              {
                commentsVideos.map((comment, i)=> {
                  return(
                    <div key={i} className="bg-gray-100 p-4 rounded-lg shadow my-2">
                      <p className="text-sm text-gray-600 mt-2">
                        {
                          comment.comment
                        }
                      </p>
                      <p className="text-end font-bold">
                        <small>
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
                //onClick="console.log('Button clicked!')"
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
      </td>
    </tr>
  );
};

export default TrDinamycVideo;
