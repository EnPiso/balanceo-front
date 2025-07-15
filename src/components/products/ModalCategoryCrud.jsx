import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure, Tooltip, Spinner,
} from "@nextui-org/react";
import {FaAcquisitionsIncorporated, FaBackward, FaPlusCircle, FaSave} from "react-icons/fa";
import React, {useState} from "react";
import {Input} from "@nextui-org/react";
import CustomButton from "../../ui/CustomButton.jsx";

import {useRecoilState} from "recoil";
import {categoriesAll} from "../../infraestructure/states/states_product.js";
import FormCategoryProduct from "./FormCategoryProduct.jsx";
import ListCategoryProducts from "./ListCategoryProducts.jsx";


const ModalCategoryCrud = ({ isOpen, onClose }) => {

  const [name,setName] = useState("")
  const [validate,setValidate] = useState(false)
  const [categories, setCategories] = useRecoilState(categoriesAll);

  const [isLoad,setIsLoad] = useState(false)

  const [isError,setIsError] = useState(false)


  const closeModal = () => {
    onOpenChange(false); // Esto cerrará el modal
    setName("")
  };

  
  return (
    <>

      <Modal
        placement="center"
        scrollBehavior={"inside"}
        size={"5xl"}
        backdrop="opaque"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Personalizar categorías
              </ModalHeader>
              <ModalBody>
                <ListCategoryProducts/>
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

export default ModalCategoryCrud;