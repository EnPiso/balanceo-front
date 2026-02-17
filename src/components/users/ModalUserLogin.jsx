import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'
import CustomButton from '../../ui/CustomButton'
import { FaBackward } from 'react-icons/fa'
import { isShowModalLogIn, temporalTokenObj } from '../../infraestructure/states/states_views'
import { useRecoilState } from 'recoil'
import LoginForm from './FormLogin'
import IconMain from '../views/IconMain'
import FormSignup from './FormSignup'
import ConfirmPassword from './ConfirmPassword'

const ModalUserLogin = () => {
  const [isModalLogIn, setIsModalLogIn] = useRecoilState(isShowModalLogIn); 

  const [tokenTemporal, setTokenTemporal] = useRecoilState(temporalTokenObj);


  const [isLogin, setIsLogin] = useState(true);

  const [accountDelete, setAccountDelete] = useState(false);

  const handleClose = () => {
    setIsModalLogIn(false)
    setAccountDelete(false)
  }

  return (
    
        <Modal
            placement="center"
            size="xl"
            isOpen={isModalLogIn}
            scrollBehavior={"inside"}
            onOpenChange={(isOpenState) => {
              setIsModalLogIn(isOpenState)
              !isOpenState && setAccountDelete(false)
            }} // Actualiza el estado
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex justify-start items-center">
                          
                          {!accountDelete && !tokenTemporal && "Bienvenido"}   
                        </ModalHeader>
                        <ModalBody>
                          {
                            tokenTemporal ? 
                              <ConfirmPassword/> :
                              <LoginForm
                                isLogin={isLogin}
                                setIsLogin={setIsLogin}
                                setAccountDelete={setAccountDelete}
                                accountDelete={accountDelete}
                              /> 
                          }
                          
                          
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

export default ModalUserLogin