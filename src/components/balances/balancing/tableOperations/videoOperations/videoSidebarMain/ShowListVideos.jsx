import React from "react";
import { FaStar } from "react-icons/fa";

const ShowListVideos = ({ videos, operation }) => {
  return (
    <div className=" rounded-lg">
      <h2 className="text-lg font-semibold text-secondary_two mb-4">
        {operation.operation}
      </h2>
      {videos && videos.length > 0 ? (
        <ul className="space-y-4">
          {videos.map((video) => (
            <li
              key={video.id}
              className="flex flex-col "
            >
              {/* Video */}
                <video
                  controls
                  className="w-full h-full object-cover rounded-md"
                  src={video.video_url}
                  alt={video.title || "Video"}
                />
          
              {/* Información del video */}
              <div className={`flex justify-between items-center mt-2 bg-zinc-100 rounded-md px-1`}>
                {
                  video.oper ? (
                    <p>
                      <span className="text-sm text-zinc-800 font-bold">
                        {video.oper?.name}
                      </span>
                    </p>
                  ) : (
                    <div>{""}</div>
                  )
                }
                
                <p className="text-xs text-zinc-800 font-bold py-3 flex justify-end">
                  {new Date(video.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {video.favorite && (
                    <FaStar 
                      size={14} 
                      className='text-secondary_two ml-1'/> 
                  )}
                </p>
              </div>
             
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No hay videos disponibles.</p>
      )}
    </div>
  );
};

export default ShowListVideos;