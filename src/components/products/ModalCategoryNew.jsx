import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure, Tooltip, Spinner,
} from "@nextui-org/react";
import {FaBackward, FaPlusCircle, FaSave} from "react-icons/fa";
import React, {useState} from "react";
import {Input} from "@nextui-org/react";
import CustomButton from "../../ui/CustomButton.jsx";
import {FaEraser} from "react-icons/fa6";
import InputNewCategory from "./InputNewCategory.jsx";
import {postData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";
import {useRecoilState} from "recoil";
import {categoriesAll} from "../../infraestructure/states/states_product.js";


const ModalCategoryNew = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [name,setName] = useState("")
  const [validate,setValidate] = useState(false)
  const [categories, setCategories] = useRecoilState(categoriesAll);

  const [isLoad,setIsLoad] = useState(false)

  const [isError,setIsError] = useState(false)



  const handleApi = () => {
    setIsLoad(true)
    const nameLower = toLowerCase(name)

    const data = {
      category_product: {
        name: nameLower
      }
    }
    const createCatProd = async (data) => {
      try {
        const result = await postData(urlMain + "category_products", data);

        if(result) {
          // Hacemos una copia del array 'categories' para evitar mutarlo directamente
          const obj = {
            key: result.name,
            label: result.name,
            id: result.id
          }
          const updateArray = [...categories,obj]

          const sortedArray = updateArray.sort((a, b) => {
            const labelA = a.label || ''; // Usa una cadena vacía si 'label' es undefined
            const labelB = b.label || ''; // Usa una cadena vacía si 'label' es undefined
            return labelA.localeCompare(labelB);
          });


          const sortedCategories = sortedArray.sort((a, b) => a.label.localeCompare(b.label));

          // Ahora, puedes establecer las categorías ordenadas
          setCategories(sortedCategories);

          // Mostrar mensaje de éxito
          toast.success(toastMessageCustom.operationsNew);
          closeModal()
          setIsLoad(false)
        } else {
          setIsError(true)

          setTimeout(()=> {
            setIsError(false)
          }, 2500)
          toast.error("El nombre ya está en uso. Por favor elige otro.");
        }

      } catch (error) {
        console.error('Error setting data', error);
        toast.error(`Error: ${error.message}`); // Muestra un mensaje de error al usuario
      } finally {
        setIsLoad(false)
      }
    };

    createCatProd(data);

  }

  const closeModal = () => {
    onOpenChange(false); // Esto cerrará el modal
    setName("")
  };

  const openModal = () => {
    onOpenChange(true); // Esto cerrará el modal
    setName("")
  };

  const toLowerCase = (str) => {
    if (typeof str !== 'string') return '';
    return str.toLowerCase(); // Convierte toda la cadena a minúsculas
  };

  const capitalize = (str) => {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <>
      <Tooltip content={"Crear categoría"}>
        <button onClick={openModal} className="!cursor-pointer">
          <FaPlusCircle color={"green"} size={20}/>
        </button>
      </Tooltip>

      <Modal
        placement="center"
        backdrop="opaque"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar categoría
              </ModalHeader>
              <ModalBody>
                  <InputNewCategory
                    isError={isError}
                    name={name}
                    setName={setName}
                    setValidate={setValidate}
                  />

              </ModalBody>


              <ModalFooter>
                {
                  validate && (

                    <>
                      {
                        isLoad ? <Spinner size={"lg"} color={"default"}/> :
                          <CustomButton
                            color="default"
                            variant="bordered"
                            startContent={<FaSave color="green"/>}
                            onClick={handleApi}
                            title="Guardar"
                          />
                      }

                    </>

                  )
                }




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

export default ModalCategoryNew;