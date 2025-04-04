import {FaBackward, FaBoxOpen, FaPlusCircle} from "react-icons/fa";
import {Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Tooltip} from "@nextui-org/react";
import React,{useState} from "react";
import ListProductsCustom from "../products/ListProductsCustom.jsx";
import ModalCategoryCrud from "../products/ModalCategoryCrud.jsx";
import CustomButton from "../../ui/CustomButton.jsx";
import ListOperationsProduct from "./ListOperationsProduct.jsx";
import {useRecoilState} from "recoil";
import {operationsProduct} from "../../infraestructure/states/operation_states.js";

const ModalOperationProduct = ({setIsOpen, isOpen, isLoading}) => {
  const [operations, setOperations] = useRecoilState(operationsProduct)

  const [isNewOperation, setIsNewOperation] = useState(false);


  return(
    <>
      <div className="flex flex-col gap-2">


        <Modal
          placement="center"
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

                  {
                    isNewOperation ?
                      <Tooltip placement={"right-end"} content={"Regresar"}>
                        <button onClick={()=> setIsNewOperation(false)}>
                          <FaBackward color={"green"} size={23} className={"ml-3"}/>
                        </button>
                      </Tooltip> :
                      <Tooltip placement={"right-end"} content={"Agregar nueva operación"}>
                        <button onClick={()=> setIsNewOperation(true)}>
                          <FaPlusCircle color={"green"} size={23} className={"ml-3"}/>
                        </button>
                      </Tooltip>

                  }


                </ModalHeader>
                <ModalBody>
                  {
                    isLoading ?
                    <div className="flex justify-center">
                        <Spinner
                          size={"lg"}
                          color={"default"}/>
                    </div> :
                      <ListOperationsProduct
                        isNewOperation={isNewOperation}
                        setIsNewOperation={setIsNewOperation}
                      />
                  }


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