
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";

import {FaBackward, FaPlusCircle, FaUser, FaWindowClose} from "react-icons/fa";
import CustomButton from "../../../ui/CustomButton";
import FormOperNewCustom from "./FormOperNewCustom";
import { useState } from "react";
import ShowNewOperCustom from "./ShowNewOperCustom";




const ModalFormOperMaster = ({isOpen, setIsOpen}) => {

  const [newObjOper,setNewObjOper] = useState(null)

  
  return (
    <div className="flex flex-col gap-2">
      <Modal
        placement="center"
        size="md"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={(isOpenState) => {
          setIsOpen(isOpenState)
        }} // Actualiza el estado
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start">

                <span className="text-secondary_two ml-1 capitalize font-bold">
                  {
                    newObjOper ? "" : "Nuevo Operario"
                  }  
                </span>  
              </ModalHeader>
              <ModalBody>
                
                {
                  newObjOper ? (
                    <ShowNewOperCustom
                      newObjOper={newObjOper}
                    />
                  ) :
                  <FormOperNewCustom
                    setNewObjOper={setNewObjOper}
                  />
                }
              </ModalBody>
              <ModalFooter>

                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaWindowClose color="red" />}
                  onClick={()=> {
                    setIsOpen(false)
                  }}
                  title="Salir"
                />

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalFormOperMaster;
