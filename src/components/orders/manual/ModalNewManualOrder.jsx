import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import React from "react";
import { useRecoilState } from "recoil";
import { newManualObj } from "../../../infraestructure/states/operation_master_state";
import ListModalNew from "./ListModalNew";
import { FaBackward } from "react-icons/fa";
import InputOrderManual from "./InputOrderManual";
import ButtonSaveManualOrder from "./ButtonSaveManualOrder";
import ImageLightbox from "../import/ImageLightBox";

const ModalNewManualOrder = ({ isOpen, setIsOpen, handleClean, image }) => {
  const [newManual] = useRecoilState(newManualObj);

  const handleClose = (e) => {
    e.stopPropagation(); // Detener la propagación del evento
    setIsOpen(false); // Cerrar el modal interno
  };

  const handleOpenChange = (open) => {

    setIsOpen(open);
    
  };

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      placement="center"
      size="5xl"
      isOpen={isOpen}
      onOpenChange={handleOpenChange} // Manejar el evento de apertura/cierre
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 uppercase">
              Agregar nueva orden
            </ModalHeader>
            <ModalBody>
              <div className="mt-2">
                <div className="flex justify-start">
                  <InputOrderManual/>
                  
                  <ButtonSaveManualOrder
                    handleClean={handleClean}
                    image={image}
                  />
                </div>
                <ImageLightbox
                  thumbnailUrl={image}
                  fullSizeUrl={image}
                  alt={`medida medidas`}
                  key={'98'}
                />
                
                
                <ListModalNew/>
              </div>
            </ModalBody>
            <ModalFooter>
              <buttom onClick={handleClose}>
                <span className="font-bold ">
                  REGRESAR 
                </span>
              </buttom>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalNewManualOrder;