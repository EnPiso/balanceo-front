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
import CustomButton from "../../ui/CustomButton.jsx";
import {FaBackward, FaPlusCircle} from "react-icons/fa";
import {newFormProduct} from "../../infraestructure/states/states_product.js";
import {useRecoilState} from "recoil";
import DashboardPlants from "../balances/balancing/sidebarForm/DashboardPlants.jsx";
import PlantsCustom from "./PlantsCustom.jsx";

const ModalOperators = ({isOpen, setIsOpen,handleClose,handleOpen}) => {
  // Usa useState para controlar el estado del modal

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
                Personalizar Operarios, plantas y módulos

              </ModalHeader>
              <ModalBody>
                <PlantsCustom/>
              </ModalBody>
              <ModalFooter>

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

export default ModalOperators;
