
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";

import {FaBackward, FaPlusCircle, FaUser, FaWindowClose} from "react-icons/fa";

import { useState } from "react";
import CustomButton from "../../ui/CustomButton";
import FormNewOperationCustom from "../operations/FormNewOperationCustom";
import FormOperationManual from "./FormOperationManual";
import BtnCreateManualOperation from "./BtnCreateManualOperation";


const ModalCreateOperationManual = ({isOpen, setIsOpen}) => {
  
  const [operation, setOperation] = useState({ operation: "", machine_name: "", machine_id: "" ,sam: "", original: true });
  const [isValid, setIsValid] = useState(false);

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
                  Nueva operación
                </span>  
              </ModalHeader>
              <ModalBody>
                <FormOperationManual
                  operation={operation}
                  setOperation={setOperation}
                  isValid={isValid}
                  setIsValid={setIsValid}
                  setIsOpen={setIsOpen}
                />
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

                {
                  isValid && 
                    <BtnCreateManualOperation
                      operation={operation}
                      setIsOpen={setIsOpen}
                    />
                }
                

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalCreateOperationManual;
