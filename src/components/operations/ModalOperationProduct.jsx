import {FaBackward, FaBoxOpen, FaPlusCircle} from "react-icons/fa";
import {Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip} from "@nextui-org/react";
import React from "react";
import ListProductsCustom from "../products/ListProductsCustom.jsx";
import ModalCategoryCrud from "../products/ModalCategoryCrud.jsx";
import CustomButton from "../../ui/CustomButton.jsx";
import ListOperationsProduct from "./ListOperationsProduct.jsx";
import {useRecoilState} from "recoil";
import {operationsProduct} from "../../infraestructure/states/operation_states.js";

const ModalOperationProduct = ({setIsOpen, isOpen}) => {
  const [operations, setOperations] = useRecoilState(operationsProduct)


  return(
    <>
      <div className="flex flex-col gap-2">


        <Modal
          size="5xl"
          isOpen={isOpen}
          scrollBehavior={"inside"}
          onOpenChange={(isOpenState) => setIsOpen(isOpenState)} // Actualiza el estado
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-start items-center">
                  Personalizar Operaciones de {" "}

                  {
                    operations &&  operations.product && operations.product["name"]
                  }

                </ModalHeader>
                <ModalBody>
                  <ListOperationsProduct/>

                </ModalBody>
                <ModalFooter>

                  <CustomButton
                    color="default"
                    variant="bordered"
                    startContent={<FaBackward/>}
                    onClick={()=> setIsOpen(false)}
                    title="Regresar"
                  />

                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default ModalOperationProduct;