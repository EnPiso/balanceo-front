import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../../infraestructure/states/order_states.js";
import React, {useEffect} from "react";
import ProductCardCustom from "./ProductCardCustom.jsx";
import CustomButton from "../../../../ui/CustomButton.jsx";
import {FaBackward, FaSave} from "react-icons/fa";
import TabOperationsCustom from "./TabOperationsCustom.jsx";
import DragAndDropApp from "./dragAndDrop/DragAndDropApp.jsx";

const ModalCustomProduct = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);


  const [selected, setSelected] = React.useState("agregar");


  useEffect(() => {

  }, []);

  return (
    <>
      <Button className="ml-4 font-bold uppercase" onPress={onOpen}>
        Personalizar {objBalancing.product.name}
      </Button>

      <Modal
        scrollBehavior={"inside"}
        size={selected === "agregar" ? "5xl" : "full"}
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{objBalancing.product.name}</ModalHeader>
              <ModalBody>
                <TabOperationsCustom
                  selected={selected}
                  setSelected={setSelected}
                  onClose={onClose}
                />

              </ModalBody>
              <ModalFooter>
                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaBackward />}
                  onClick={onClose}
                  title="Regresar"
                />

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCustomProduct;