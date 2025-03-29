import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import React from "react";
import WebcamAndEditor from "../videoRecCamera/WebcamAndEditor";
import { isOpenModalRec, operationRecVideo } from "../../../../../infraestructure/states/states_videos";
import { useRecoilState } from "recoil";
import { FaX } from "react-icons/fa6";

export const ModalRecOutside = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenModalRec);
  const [operationRec, setOperationRec] = useRecoilState(operationRecVideo);

  return (
    <>
      {isOpen && (
        <Modal
          className="bg-primary_one p-0 m-0 overflow-hidden" // Elimina padding, margen y scroll innecesario
          scrollBehavior="inside"
          size={"full"}
          placement={"center"}
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
          hideCloseButton
        >
          <ModalContent className="w-full h-full p-0 m-0 overflow-hidden">
            <>
              <ModalBody className="w-full h-full p-0 m-0 flex items-center justify-center overflow-hidden">
                {/* Botón personalizado para cerrar el modal */}
                <div className="absolute top-4 right-0 z-50">
                  <button onClick={() => setIsOpen(false)} className="py-2 px-4 rounded">
                    <FaX size={25} className="text-secondary_two" />
                  </button>
                </div>
                <WebcamAndEditor operation={operationRec} setIsOpen={setIsOpen} />
              </ModalBody>
            </>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};