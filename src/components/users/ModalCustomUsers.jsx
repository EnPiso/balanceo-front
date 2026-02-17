import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'

import { FaBackward } from 'react-icons/fa'
import CustomButton from '../../ui/CustomButton'
import { currentUser } from '../../infraestructure/states/states_views'
import { useRecoilState } from 'recoil'
import { CloseSession } from '../views/CloseSession'
import TabsUsers from './TabsUsers'


const ModalCustomUsers = ({isOpen, setIsOpen}) => {

  const [isOpenClose, setIsOpenClose] = useState(false)

  const [user, setUser] = useRecoilState(currentUser);

  const [activeTab, setActiveTab] = useState("mi-usuario"); 

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    
        <Modal
            placement="center"
            size="5xl"
            isOpen={isOpen}
            scrollBehavior={"inside"}
            onOpenChange={(isOpenState) => setIsOpen(isOpenState)} // Actualiza el estado
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex justify-start items-center">
                          {
                            !(activeTab === "mi-usuario") && "Usuarios"
                          }
                          
                        </ModalHeader>
                        <ModalBody>
                          <TabsUsers 
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            setIsOpen={setIsOpen}/>
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
  )
}

export default ModalCustomUsers