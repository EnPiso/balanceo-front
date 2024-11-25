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
import {checkOpersPosition, selectOpers} from "../../../../infraestructure/states/opers_states.js";
import {orderObjBalancing, showOrderObj} from "../../../../infraestructure/states/order_states.js";
import {postData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import useModal from "./useModal.jsx";
import {FaBackward, FaSave} from "react-icons/fa";
import CustomButton from "../../../../ui/CustomButton.jsx";
import SpinnerLoaderCustom from "../../../../ui/SpinnerLoaderCustom.jsx";
import {allOperationsProduct} from "../../../../infraestructure/states/operation_states.js";
import {detailOperOperations, zonesOpers} from "../../../../infraestructure/states/states_balancing.js";
import {ConfirmOpen} from "./ConfirmOpers.jsx";

const ModalDragOpers = () => {
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers);
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('md');

  const [isLoading, setIsLoading] = useState(false)


  const [zonesOpersData, setZonesOpersData] = useRecoilState(zonesOpers); // Array con los detalles de cada selección
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);





  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  // Función para actualizar selectedOperDetails
  const updateSelectedOperDetails = (oper, isSelected) => {
    setSelectedOperDetails((prevDetails) => {
      if (isSelected) {
        // Agrega el operario con el siguiente índice de selección
        return [...prevDetails, { id: oper.id, name: oper.name, index: prevDetails.length + 1 }];
      } else {
        // Remueve el operario y actualiza los índices de selección
        const updatedDetails = prevDetails.filter((detail) => detail.id !== oper.id);
        return updatedDetails.map((detail, idx) => ({ ...detail, index: idx + 1 }));
      }
    });
  };


  const handleSave =  (onClose) =>{

    setIsLoading(true)

    const data = {
      opers_balancing: {
        opers: JSON.stringify(selectedOperDetails),
        product_id: objBalancing.product.id,
        zones_opers_data: JSON.stringify(zonesOpersData),
        order_id: showOrder.order.id
      }
    }
    const postDataOrder = async (data) => {
      try {
        const result = await postData(urlMain + "/opers_balancings/create_opers", data)

        setDetailOperOpera(result.balance_zones)

        onClose()
        setIsLoading(false)
      } catch (error) {
        console.error('Error setting data', error);
        setIsLoading(false)
      }
    };
    postDataOrder(data);
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => handleOpen("3xl")}
          size="7xl"
          className="dark:bg-zinc-900 h-10 font-bold"
          variant="bordered"
        >
          {opersSelect.size >= 1 ? `Operarios ${opersSelect.size}` : "Seleccionar operarios"}
        </Button>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Seleccionar operarios</ModalHeader>
              <ModalBody>
                <ListOpers
                  updateSelectedOperDetails={updateSelectedOperDetails}
                  selectedOperDetails={selectedOperDetails}
                />

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
