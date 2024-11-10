import React, {useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import ExcelImageLoader from "./import/ExcelImageLoader.jsx";
import CustomButton from "../../ui/CustomButton.jsx";
import {FaEraser} from "react-icons/fa6";
import {FaBackward, FaSave} from "react-icons/fa";
import InputOrder from "./import/InputOrder.jsx";


const ModalDashboardOrder = () => {
  const [images, setImages] = useState([]);
  const [operationsData, setOperationsData] = useState([]);


  const {isOpen, onOpen, onClose} = useDisclosure();

  // const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];

  const eraseData = () => {
    setImages([])
    setOperationsData([])
  }
  const handleOpen = () => {
    //setSize(size)
    onOpen();
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleOpen}
          size="5xl"
          className="w-full dark:bg-zinc-900 h-10 font-bold "
          variant="bordered">
         Orden de producción

        </Button>

      </div>
      <Modal
        size={"5xl"}
        isOpen={isOpen}
        onClose={onClose}
        className="overflow-y-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {
                  operationsData.length < 1 && "Carga la ordén"
                }

              </ModalHeader>
              <ModalBody>

                <div className="mt-12">

                  <ExcelImageLoader
                    images={images}
                    setImages={setImages}
                    operationsData={operationsData}
                    setOperationsData={setOperationsData}
                  />
                  <InputOrder/>
                </div>

              </ModalBody>
              <ModalFooter>

                <div className="flex justify-end">
                  {
                    operationsData.length >= 1 && (
                      <>
                        <CustomButton
                          color="default"
                          variant="bordered"
                          startContent={<FaSave color="green"/>}
                          onClick={()=> alert("Save")}
                          title="Guardar"
                        />
                        <CustomButton
                          color="default"
                          variant="bordered"
                          startContent={<FaEraser color="red"/>}
                          onClick={eraseData}
                          title="Borrar"
                        />
                      </>
                    )
                  }

                  <CustomButton
                    color="default"
                    variant="bordered"
                    startContent={<FaBackward />}
                    onClick={onClose}
                    title="Regresar"
                  />

                </div>



              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDashboardOrder;