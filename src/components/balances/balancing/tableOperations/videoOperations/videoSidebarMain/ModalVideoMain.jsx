import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'
import CustomButton from '../../../../../../ui/CustomButton'
import { FaWindowClose } from 'react-icons/fa'
import ListVideosMain from './ListVideosMain'

const ModalVideoMain = ({setIsOpen, handleClose, isOpen}) => {
  return (
    
      <Modal
        placement="center"
        size="5xl"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={(isOpenState) => {
          setIsOpen(isOpenState)
        }} // Actualiza el estado
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start items-center">
                Operaciones y vídeos

              </ModalHeader>
              <ModalBody>
                <ListVideosMain/>
              </ModalBody>
              <ModalFooter>

                

                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaWindowClose color="red" />}
                  onClick={()=> {
                    handleClose()
                  }}
                  title="Salir"
                />

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}

export default ModalVideoMain