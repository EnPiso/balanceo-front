import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {FaBackward, FaRecordVinyl, FaSave} from "react-icons/fa";
;
import React, { useState } from "react";
import MyCustomButton from "../../../../../ui/MyCustomButton";
import WebcamAndEditor from "../videoRecCamera/WebcamAndEditor";
import { isOpenModalRec, operationRecVideo } from "../../../../../infraestructure/states/states_videos";
import { useRecoilState } from "recoil";

const ButtonRecVideoMobile = ({operation}) => {
  const [isOpen,setIsOpen] = useRecoilState(isOpenModalRec)
  const [operationRec,setOperationRec] = useRecoilState(operationRecVideo)
  
  const handleVideo = (operation) => {
    setIsOpen(true)
    setOperationRec(operation)
  }

  return (
    <>
      <button
        onClick={()=> handleVideo(operation)}
        className="mt-2 ">
        <FaRecordVinyl
          size={45}
          className='text-red-500'
        />
      </button>
     
    </>
  );
}

export default ButtonRecVideoMobile;