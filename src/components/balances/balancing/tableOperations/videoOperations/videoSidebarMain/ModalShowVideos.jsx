import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'
import CustomButton from '../../../../../../ui/CustomButton'
import { FaWindowClose } from 'react-icons/fa'
import ListVideosMain from './ListVideosMain'
import ShowListVideos from './ShowListVideos'

const ModalShowVideos = ({setIsOpen, handleClose, isOpen, videos, operation, setOperationTemp}) => {
  return (
    
      <Modal
        placement="center"
        size="md"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={(isOpenState) => {
          setIsOpen(isOpenState)
          !isOpenState && setOperationTemp(null)
        }} // Actualiza el estado
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start items-center">
               
              </ModalHeader>
              <ModalBody>
                <ShowListVideos
                  operation={operation} 
                  videos={videos}/>
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

export default ModalShowVideos