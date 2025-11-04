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
import {FaAcquisitionsIncorporated, FaBackward, FaPlus, FaPlusCircle} from "react-icons/fa";
import ModalCategoryCrud from "./ModalCategoryCrud.jsx";
import {newFormProduct} from "../../infraestructure/states/states_product.js";
import {useRecoilState} from "recoil";
import { currentUser } from "../../infraestructure/states/states_views.js";

const ModalProducts = ({isOpen, setIsOpen,handleClose,handleOpen}) => {
    // Usa useState para controlar el estado del modal
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isNewProduct, setIsNewProduct] = useRecoilState(newFormProduct);

    const [user, setUser] = useRecoilState(currentUser);

    const handleProduct = () => {
        setIsNewProduct(!isNewProduct)
    }

    return (
        <div className="flex flex-col gap-2">


            <Modal
                placement="center"
                size="full"
                isOpen={isOpen}
                scrollBehavior={"inside"}
                onOpenChange={(isOpenState) => setIsOpen(isOpenState)} // Actualiza el estado
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-start items-center">
                                {
                                    isNewProduct ?  "Nuevo producto" : "Personalizar productos"
                                }
                            </ModalHeader>
                            <ModalBody>
                                <ListProductsCustom
                                    handleProduct={handleProduct}
                                />
                            </ModalBody>
                            <ModalFooter>
                                {
                                    user && user.role === "admin" &&
                                        <Tooltip content={"Crear categoría"}>
                                            <CustomButton
                                                color="default"
                                                variant="bordered"
                                                startContent={<FaAcquisitionsIncorporated />}
                                                onClick={() => setIsCategoryModalOpen(true)}
                                                title="Personalizar Categorías"
                                            />
                                        </Tooltip>
                                    
                                }

                                
                                <ModalCategoryCrud
                                    isOpen={isCategoryModalOpen}
                                    onClose={() => setIsCategoryModalOpen(false)}
                                    
                                    />
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
