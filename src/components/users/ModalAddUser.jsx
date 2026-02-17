import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'


import { FaBackward } from 'react-icons/fa'
import CustomButton from '../../ui/CustomButton'
import FormNewUser from './FormNewUser'


const ModalAddUser = ({isOpen, setIsOpen}) => {

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    
        <Modal
            placement="center"
            size="xl"
            isOpen={isOpen}
            scrollBehavior={"inside"}
            onOpenChange={(isOpenState) => setIsOpen(isOpenState)} // Actualiza el estado
        >
            <ModalContent>
              {(onClose) => (
                <>
                    <ModalHeader className="flex justify-start items-center">
                      Nuevo usuario
                    </ModalHeader>
                    <ModalBody>
                      <FormNewUser 
                        setIsOpen={setIsOpen}
                      />
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

export default ModalAddUser