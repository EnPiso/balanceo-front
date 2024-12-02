import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../../infraestructure/states/order_states.js";
import React, {useEffect} from "react";
import ProductCardCustom from "./ProductCardCustom.jsx";
import CustomButton from "../../../../ui/CustomButton.jsx";
import {FaBackward, FaSave} from "react-icons/fa";

const ModalCustomProduct = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);


  useEffect(() => {

  }, []);

  return (
    <>
      <Button className="ml-4 font-bold uppercase" onPress={onOpen}>
        Personalizar {objBalancing.product.name}
      </Button>

      <Modal
        scrollBehavior={"inside"}
        size="5xl"
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
                <ProductCardCustom/>
              </ModalBody>
              <ModalFooter>
                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaBackward />}
                  onClick={onClose}
                  title="Regresar"
                />
                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaSave color="green" />}
                  onClick={onClose}
                  title="Agregar Operación"
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