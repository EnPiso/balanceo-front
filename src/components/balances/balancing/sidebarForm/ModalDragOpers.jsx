import React, { useState, useEffect } from "react";
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
import { ListOpers } from "../../opers/ListOpers.jsx";
import { useRecoilState } from "recoil";
import {
  checkOpersPosition, isNewModule,
  selectOpers,
  selectProdPlant,
  selectProdPlantOriginal
} from "../../../../infraestructure/states/opers_states.js";
import {orderObjBalancing, showOrderObj} from "../../../../infraestructure/states/order_states.js";
import {postData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import useModal from "./useModal.jsx";
import {FaBackward, FaEdit, FaSave, FaUsers} from "react-icons/fa";
import CustomButton from "../../../../ui/CustomButton.jsx";
import SpinnerLoaderCustom from "../../../../ui/SpinnerLoaderCustom.jsx";
import {allOperationsProduct} from "../../../../infraestructure/states/operation_states.js";
import {balancingData, detailOperOperations, zonesOpers} from "../../../../infraestructure/states/states_balancing.js";
import {ConfirmOpen} from "./ConfirmOpers.jsx";
import {assignColorsToArray, isRepeatColor, isRepeatUpdate} from "../../../../ui/utils.js";
import DashboardPlants from "./DashboardPlants.jsx";
import {imageTableBalancing} from "../../../../infraestructure/states/states_product.js";
import {nameImageDateNow} from "../../../../infraestructure/utils/imagesFormat.js";
import MyCustomButton from "../../../../ui/MyCustomButton.jsx";

const ModalDragOpers = () => {
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers);
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('5xl');

  const [isLoading, setIsLoading] = useState(false)


  const [zonesOpersData, setZonesOpersData] = useRecoilState(zonesOpers); // Array con los detalles de cada selección
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [balancing, setBalancing] = useRecoilState(balancingData);

  const [prodPlant, setProdPlant] = useRecoilState(selectProdPlant)
  const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)

  const [isNewInModuleTempo, setIsNewInModuleTempo] = useRecoilState(isNewModule)

  const [imageTable, setImageTable] = useRecoilState(imageTableBalancing)

  useEffect(() => {
    // console.log(detailOperOpera)
  }, [detailOperOpera]);


  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  // Función para actualizar selectedOperDetails
  const updateSelectedOperDetails = (oper, isSelected) => {

    setSelectedOperDetails((prevDetails) => {
      if (isSelected) {
        // Agrega el operario con el siguiente índice de selección
        return [...prevDetails, { id: oper.id, name: oper.name, index: prevDetails.length + 1, avatar: oper.avatar }];
      } else {
        // Remueve el operario y actualiza los índices de selección
        const updatedDetails = prevDetails.filter((detail) => detail.id !== oper.id);
        return updatedDetails.map((detail, idx) => ({ ...detail, index: idx + 1 }));
      }
    });
  };


  const handleSave = (onClose) => {
    setIsLoading(true);
    console.log(isNewInModuleTempo)
    console.log(selectedOperDetails)
    console.log(opersSelect)
    // Filtra los objetos en `selectedOperDetails` cuyos IDs estén presentes en `opersSelect`
    const filteredDetails = selectedOperDetails.filter((detail) =>
        opersSelect.has(detail.id)
    );

    // Extraer los IDs de selectedOperDetails y convertirlos en un Set
    const updatedOpersSelect = new Set(selectedOperDetails.map((detail) => detail.id));

// Actualizar el estado de opersSelect
    setOpersSelect(updatedOpersSelect);

    console.log(filteredDetails);

    const data = {
      opers_balancing: {
        opers: JSON.stringify(selectedOperDetails),
        product_id: objBalancing.product.id,
        order_id: showOrder.order.id,
        gol_hour: balancing.gol_hour,
        operations: JSON.stringify(objBalancing.operations),
        module: prodPlant.module.id,
        plant: prodPlant.plant.id,
      },
    };

    const postDataOrder = async (data) => {
      try {
        const result = await postData(urlMain + "/opers_balancings/create_opers", data);
        const detail = assignColorsToArray(result.data_detail_end);
        setDetailOperOpera(detail);
        setProdPlantOriginal(prodPlant); // Actualiza el módulo original al nuevo módulo
        onClose();
        setIsLoading(false);
        setTimeout(()=> {
          setImageTable(nameImageDateNow)
        },1000)

      } catch (error) {
        console.error("Error al guardar datos", error);
        setIsLoading(false);
      }
    };

    postDataOrder(data);
  };

  return (
    <>
      <div className="flex justify-center ">
             <MyCustomButton
                icon={<FaUsers className=" mt-1 mr-3 "/>}
                title={opersSelect.size >= 1 ? `Operarios ${opersSelect.size}` : "Operarios"}
                handleClick={() => {
                  handleOpen("3xl")
                  setProdPlant(prodPlantOriginal)
                }}
                value={opersSelect.size >= 1 ? `Operarios ${opersSelect.size}` : "Operarios"}
                bgButton={"bg-primary_one "}
                textButton={"text-secondary_two"}
              />
   
        
      </div>
      <Modal scrollBehavior="inside" backdrop="blur" size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Plantas , módulos y operarios
              </ModalHeader>
              <ModalBody>
                <DashboardPlants/>
                {
                  prodPlant && <ListOpers
                        updateSelectedOperDetails={updateSelectedOperDetails}
                        selectedOperDetails={selectedOperDetails}
                        handleSave={handleSave}
                        onClose={onClose}
                    />
                }


              </ModalBody>
              <ModalFooter>
                {
                  isLoading ? (
                    <>
                    <div className="mr-6">
                      <SpinnerLoaderCustom/>
                    </div>
                    </>
                  ) : (
                    <>

                      <Tooltip
                        content="Si guardas, se actualizan todas las polivalencias">
                        <CustomButton
                          color="default"
                          variant="bordered"
                          startContent={<FaSave color="green"/>}
                          onClick={() =>  setIsOpenConfirm(true)}
                          title="Guardar operarios"
                        />
                      </Tooltip>

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

                <ConfirmOpen
                  isOpen={isOpenConfirm}
                  setIsOpen={setIsOpenConfirm}
                  handleSave={() => handleSave(onClose)}
                  title="Si actualizas los operarios,"
                  description="se actualizan todas las polivalencias"
                />


              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDragOpers;
