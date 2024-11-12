import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { ListOpers } from "../../opers/ListOpers.jsx";
import { useRecoilState } from "recoil";
import {checkOpersPosition, selectOpers} from "../../../../infraestructure/states/opers_states.js";

const ModalDragOpers = () => {
  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers);
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('md');

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  // Función para actualizar selectedOperDetails
  const updateSelectedOperDetails = (oper, isSelected) => {
    setSelectedOperDetails((prevDetails) => {
      if (isSelected) {
        // Agrega el operario con el siguiente índice de selección
        return [...prevDetails, { id: oper.id, name: oper.name, index: prevDetails.length + 1 }];
      } else {
        // Remueve el operario y actualiza los índices de selección
        const updatedDetails = prevDetails.filter((detail) => detail.id !== oper.id);
        return updatedDetails.map((detail, idx) => ({ ...detail, index: idx + 1 }));
      }
    });
  };



  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => handleOpen("3xl")}
          size="7xl"
          className="dark:bg-zinc-900 h-10 font-bold"
          variant="bordered"
        >
          {opersSelect.size >= 1 ? `Operarios ${opersSelect.size}` : "Seleccionar operarios"}
        </Button>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Seleccionar operarios</ModalHeader>
              <ModalBody>
                <ListOpers
                  updateSelectedOperDetails={updateSelectedOperDetails}
                  selectedOperDetails={selectedOperDetails}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Regresar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDragOpers;
