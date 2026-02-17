import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import WebcamAndEditor from "./WebcamAndEditor.jsx";

const ModalDashboardRec = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();


  const handleOpen = () => {

    onOpen();
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button  onPress={() => handleOpen()}>Open</Button>
      </div>
      <Modal
        size={"full"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <WebcamAndEditor/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDashboardRec;