import React, { useEffect, useRef } from 'react';
import { useRecoilState } from "recoil";
import {listVideosOpers, videoOperation} from "../../../../../infraestructure/states/states_videos.js";
import {TagButton} from "../../../../../ui/TagButton.jsx";
import {FaPlay} from "react-icons/fa6";
import DraggableVideo from "./DraggableVideo.jsx";
import WebcamComponent from "../videoRecCamera/WebcamComponent.jsx";

const TrDinamycVideo = () => {
  const [videoObjOperation, setVideoObjOperation] = useRecoilState(videoOperation);
  const videoRef = useRef(null); // Referencia al elemento <video>
  const [OpersTags, setOpersTags] = useRecoilState(listVideosOpers)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Recarga el video cada vez que cambia el estado
    }
  }, [videoObjOperation]);

  return (
    <tr className="border border-zinc-50 w-full">
      <td className="py-2 px-2 container w-full">


        {
          videoObjOperation ? (
            <>
             <div className="px-2 py-2">
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

             </div>
              {
                videoObjOperation && <DraggableVideo
                  videoRef={videoRef}
                  videoObjOperation={videoObjOperation}
                />
              }

              <div className="bg-gray-100 p-4 rounded-lg shadow my-2">
                <p className="text-sm text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto
                  asperiores corporis dolorum eius est ex facere in laboriosam,
                  mollitia nihil obcaecati omnis qui quisquam quo sit temporibus veniam veritatis!</p>
                <small>2024 Noviembre 25</small>

              </div>

              {/* Campo de comentarios */}
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Comentarios</h2>
                <textarea
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Escribe tu comentario aquí..."
                  //value={comments}
                  //onChange={(e) => setComments(e.target.value)}
                ></textarea>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  //onClick={handleCommentSubmit}
                >
                  Enviar Comentario
                </button>
              </div>


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
                Selecciona vídeo
              </p>
            </div>
          )
        }
      </td>
    </tr>
  );
};

export default TrDinamycVideo;
