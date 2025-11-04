import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {FaBackward, FaSave, FaUserAlt, FaUserAltSlash} from "react-icons/fa";

import React from "react";
import CustomButton from "../../ui/CustomButton";
import { useRecoilState } from "recoil";
import { currentUser } from "../../infraestructure/states/states_views";
import toast from "react-hot-toast";

export const CloseSession = ({isOpen, setIsOpen, handleSave, title, description}) => {
  const [user, setUser] = useRecoilState(currentUser);
  
  const handleClose = () => {
    setIsOpen(false)
    setUser(null)
    localStorage.removeItem('token');
    toast("Sesión cerrada correctamente")
  }

  return (
    <>

      <Modal placement={"center"} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <ModalContent>
            <>
              <ModalBody>
                <div className="mt-2 p-2 text-xl text-center rounded-lg">
                  <p>{title}</p>
                  <p>
                    <b className="text-secondary_two">{description}</b>
                  </p>
                </div>

              </ModalBody>
              <ModalFooter className="flex justify-center">

                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaUserAltSlash color="red" size={24}/>}
                  onClick={handleClose}
                  title="Cerrar sesión"
                />
                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={null}
                  onClick={() => setIsOpen(false)}
                  title="No, Cancelar"
                />

              </ModalFooter>
            </>

        </ModalContent>
      </Modal>
    </>
  );
}