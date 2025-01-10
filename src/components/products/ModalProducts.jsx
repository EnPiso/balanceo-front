import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    RadioGroup,
    Radio,
} from "@nextui-org/react";
import ListProductsCustom from "./ListProductsCustom.jsx";
import CustomButton from "../../ui/CustomButton.jsx";
import {FaBackward} from "react-icons/fa";
import ModalCategoryCrud from "./ModalCategoryCrud.jsx";

const ModalProducts = ({isOpen, setIsOpen,handleClose,handleOpen}) => {
    // Usa useState para controlar el estado del modal


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
                            <ModalHeader className="flex flex-col gap-1">
                                Personalizar productos
                            </ModalHeader>
                            <ModalBody>
                                <ListProductsCustom/>
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
