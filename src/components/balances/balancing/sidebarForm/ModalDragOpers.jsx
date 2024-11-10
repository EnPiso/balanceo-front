import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {ListOpers} from "../../opers/ListOpers.jsx";
import {useRecoilState} from "recoil";
import {selectOpers} from "../../../../infraestructure/states/opers_states.js";

const ModalDragOpers = () => {

  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)


  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState('md')

  // const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];


  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={()=>  handleOpen("3xl")}
          size="7xl"
          className=" dark:bg-zinc-900 h-10 font-bold "
          variant="bordered">
          { opersSelect.size >= 1  ? `Operarios ${opersSelect.size}` : "Seleccionar operarios"}

        </Button>

      </div>
      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Seleccionar operarios</ModalHeader>
              <ModalBody>
               <ListOpers/>
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
}

export default ModalDragOpers;