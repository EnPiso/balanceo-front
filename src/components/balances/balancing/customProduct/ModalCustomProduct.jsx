import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip
} from "@nextui-org/react";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../../infraestructure/states/order_states.js";
import React, {useEffect} from "react";
import ProductCardCustom from "./ProductCardCustom.jsx";
import CustomButton from "../../../../ui/CustomButton.jsx";
import {FaBackward, FaEdit, FaSave} from "react-icons/fa";
import TabOperationsCustom from "./TabOperationsCustom.jsx";
import DragAndDropApp from "./dragAndDrop/DragAndDropApp.jsx";
import {selectOpers} from "../../../../infraestructure/states/opers_states.js";
import {isOperationClone} from "../../../../infraestructure/states/states_navigation.js";
import {searchOperations} from "../../../../infraestructure/states/operation_states.js";
import MyCustomButton from "../../../../ui/MyCustomButton.jsx";

const ModalCustomProduct = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)


  const [selected, setSelected] = React.useState("agregar");

  const [operationCloneIs, setOperationCloneIs] = useRecoilState(isOperationClone);
  const [cloneOperations, setCloneOperations] = useRecoilState(searchOperations);


  const handleOpen = () => {
    onOpen()
    setOperationCloneIs(false)
    setCloneOperations([])
  }

  return (
    <>
      {
        opersSelect.size >= 1 && (
            <Button className=" font-bold uppercase" onPress={handleOpen}>
              Personalizar {objBalancing.product.name} <FaEdit className="text-secondary_two"/>
            </Button>

        )
      }


      <Modal
        placement="center"
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
        <ModalContent

        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className=" text-secondary_two">
                  {objBalancing.product.name}
                </span>
                
              </ModalHeader>
              <ModalBody>

                <TabOperationsCustom
                  selected={selected}
                  setSelected={setSelected}
                  onClose={onClose}
                />

              </ModalBody>
              <ModalFooter>
              
                <MyCustomButton
                  icon={<FaBackward className=" mt-1 mr-3 text-secondary_two"/>}
                  title={`Regresar`}
                  handleClick={onClose}
                  value={`Regresar`}
                  bgButton={"bg-zinc-100"}
                  textButton={"text-zinc-800"}
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