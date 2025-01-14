import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    RadioGroup,
    Radio, Tooltip,
} from "@nextui-org/react";
import ListProductsCustom from "./ListProductsCustom.jsx";
import CustomButton from "../../ui/CustomButton.jsx";
import {FaBackward, FaPlusCircle} from "react-icons/fa";
import ModalCategoryCrud from "./ModalCategoryCrud.jsx";
import {newFormProduct} from "../../infraestructure/states/states_product.js";
import {useRecoilState} from "recoil";

const ModalProducts = ({isOpen, setIsOpen,handleClose,handleOpen}) => {
    // Usa useState para controlar el estado del modal

    const [isNewProduct, setIsNewProduct] = useRecoilState(newFormProduct);

    const handleProduct = () => {
        setIsNewProduct(!isNewProduct)
    }

    return (
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
                                {
                                    isNewProduct ? (
                                      <>
                                          Nuevo producto
                                          <Tooltip placement={"right-end"} content={"Regresar a productos"}>
                                              <button onClick={handleProduct}>
                                                  <FaBackward color={"green"} size={23} className={"ml-3"}/>
                                              </button>
                                          </Tooltip>

                                      </>
                                    ) : (

                                      <>
                                      Personalizar productos

                                          <Tooltip placement={"right-end"} content={"Agregar nuevo producto"}>
                                              <button onClick={handleProduct}>
                                                  <FaPlusCircle color={"green"} size={23} className={"ml-3"}/>
                                              </button>
                                          </Tooltip>

                                      </>
                                    )
                                }

                            </ModalHeader>
                            <ModalBody>
                                <ListProductsCustom
                                />
                            </ModalBody>
                            <ModalFooter>

                                <ModalCategoryCrud/>
                                <CustomButton
                                  color="default"
                                  variant="bordered"
                                  startContent={<FaBackward />}
                                  onClick={handleClose}
                                  title="Regresar"
                                />

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ModalProducts;
