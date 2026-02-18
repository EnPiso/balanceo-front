import React, { useState } from "react";
import {useRecoilState} from "recoil";
import {listVideosOpers} from "../../../../../infraestructure/states/states_videos.js";
import {TagButton} from "../../../../../ui/TagButton.jsx";

const ListVideosOperations = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: "Video 1", src: "https://www.w3schools.com/html/mov_bbb.mp4", description: "Descripción del Video 1" },
    { id: 2, title: "Video 2", src: "https://www.w3schools.com/html/movie.mp4", description: "Descripción del Video 2" },
  ]);
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [comments, setComments] = useState("");

  const [OpersTags, setOpersTags] = useRecoilState(listVideosOpers)


  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleCommentSubmit = () => {
    alert(`Comentario enviado: ${comments}`);
    setComments(""); // Limpia el campo de comentarios
  };

  return (
    <div className="flex flex-col md:flex-row p-4">
      {/* Lista de videos */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Lista de Videos</h2>
        <ul className="space-y-2">
          {videos.map((video) => (
            <li
              key={video.id}
              className={`p-2 rounded-lg cursor-pointer hover:bg-gray-200 ${
                selectedVideo.id === video.id ? "bg-gray-300 font-bold" : ""
              }`}
              onClick={() => handleVideoSelect(video)}
            >
              {video.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Video y descripción */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        {
          OpersTags.map ((tags, i)=> {
            return(
              <TagButton
                key={i}
                label="henry"
              />
            )
          })
        }
        {/* Video */}
        <div className="w-full bg-black rounded-lg overflow-hidden shadow">

          <video className="w-full" controls>
            <source src={selectedVideo.src} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>

        {/* Descripción */}
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Descripción</h2>
          <p className="text-sm text-gray-600 mt-2">{selectedVideo.description}</p>
        </div>

        {/* Campo de comentarios */}
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Comentarios</h2>
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Escribe tu comentario aquí..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleCommentSubmit}
          >
            Enviar Comentario
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListVideosOperations;
