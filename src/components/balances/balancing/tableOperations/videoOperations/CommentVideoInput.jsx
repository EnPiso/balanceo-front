import React, {useState} from 'react'
import CustomButton from "../../../../../ui/CustomButton.jsx";
import {FaSave} from "react-icons/fa";
import {useRecoilState} from "recoil";
import {videoOperation} from "../../../../../infraestructure/states/states_videos.js";
import {postData} from "../../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../../infraestructure/data/toastMessage.js";

const CommentVideoInput = ({setCommentsVideos, commentsVideos}) => {
  const [videoObjOperation, setVideoObjOperation] = useRecoilState(videoOperation);

  const [comments, setComments] = useState('');

  const handleComment = () => {

    const video_id = videoObjOperation.id
    const data = {
          comment_video: {
            comment: comments
          }
    }
    const postDataOrder = async (data) => {
      try {
        const result = await postData(urlMain + `/videos/${video_id}/comment_videos`, data)
        //console.log(result)
        setCommentsVideos([...commentsVideos, result.comment])

        setComments('')
        toast.success(toastMessageCustom.commentSave)

      } catch (error) {
        console.error('Error setting data', error);

      }
    };

    postDataOrder(data);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Evita el salto de línea
      handleComment()
    }
  };



  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Comentarios</h2>
      <textarea
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        placeholder="Escribe tu comentario aquí..."
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        onKeyDown={handleKeyDown} // Agrega el evento aquí

      ></textarea>

      <CustomButton
        color="default"
        variant="bordered"
        startContent={<FaSave color="green"/>}
        onClick={handleComment}
        title="Guardar comentario"
      />
    </div>
  )
}
export default CommentVideoInput
