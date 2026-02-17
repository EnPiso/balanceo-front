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
                            <ModalHeader className="flex flex-col justify-start items-start gap-3">
                                <span className="flex items-center gap-3">
                                    <img
                                        className="w-10 h-10 object-contain"
                                        src="/icon/icon.jpeg"
                                        alt="Icono de Balance"
                                    />
                                    <div className="leading-tight">
                                        <p className="text-primary_two font-[900] text-lg m-0">
                                            <span className="text-secondary_two">En</span>Piso
                                        </p>
                                        <p className="text-slate-400 text-sm tracking-wide uppercase">Balanceos</p>
                                    </div>
                                </span>

                                <span className="text-lg font-semibold text-zinc-600">
                                    {
                                        isNewProduct ? "Nuevo producto" : "Personalizar productos"
                                    }
                                </span>
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
