import { Card, CardBody, Input, CircularProgress } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaSave } from 'react-icons/fa'
import CustomButton from '../../ui/CustomButton'
import { useRecoilState } from 'recoil'
import { currentUser, isShowModalLogIn, temporalTokenObj, tokenMemory } from '../../infraestructure/states/states_views'
import { updateDataToken } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import toast from 'react-hot-toast'

const initialData = {
  password: { value: '', error: '' },
  confirm_password: { value: '', error: '' }
}

const ConfirmPassword = () => {
  const [formState, setFormState] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [isShowPass, setIsShowPass] = useState(false)

  const [tokenTemporal, setTokenTemporal] = useRecoilState(temporalTokenObj);
  const [isModalLogIn, setIsModalLogIn] = useRecoilState(isShowModalLogIn); 
  

  const [user, setUser] = useRecoilState(currentUser); 
  const [token, setToken] = useRecoilState(tokenMemory);
  

  const handleInputChange = (field) => (value) => {
    setFormState(prev => ({
      ...prev,
      [field]: { value, error: '' }
    }))
  }

  const validateForm = () => {
    let isValid = true
    const newState = { ...formState }

    if (newState.password.value.length < 6) {
      newState.password.error = 'La contraseña debe tener al menos 6 caracteres.'
      isValid = false
    }

    if (newState.password.value !== newState.confirm_password.value) {
      newState.confirm_password.error = 'Las contraseñas no coinciden.'
      isValid = false
    }

    setFormState(newState)
    return isValid
  }

  const handleSubmit = () => {
    if (!validateForm()) return
    const user = tokenTemporal.user
    const data = {
      user: {
        password: formState.password.value,
        password_confirmation: formState.confirm_password.value,
        is_change_confirmation: true
      }
    }
    handleApi(data)
    
  }

  const handleApi = (data) => {
    const updatePassword = async () => {
      
      const user_id = tokenTemporal.user.id
      const tokenString = tokenTemporal.token

      try {
        const result = await updateDataToken(urlMain + `users/${user_id}`, data, tokenString)
       
        
        setUser(tokenTemporal.user);
        setToken(tokenString);
        localStorage.setItem('token', tokenString);
        setIsModalLogIn(false)
        setTokenTemporal(null);
        toast.success( `Hola ${tokenTemporal.user.name}, Se actualizó correctamente la contraseña`)
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false)
      }
    };

    updatePassword();
  }



  const isFormInvalid =
    formState.password.value.length < 6 ||
    formState.password.value !== formState.confirm_password.value

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card className="max-w-md w-full">
        <CardBody>
          <div className="flex flex-col gap-4">

            <h5 className='text-xl text-secondary_two'>
              Bienvenido a enpiso balanceos ,  <span className='font-bold'>{tokenTemporal && tokenTemporal.user.name} </span>
            </h5>

            <p className='text-xs font-light'>
              Debes confirmar la contraseña para finalizar la configuración de tu cuenta.
            </p>

            

            <Input
              value={formState.password.value}
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              type={!isShowPass ? "password" : "text"}
              variant="bordered"
              isInvalid={!!formState.password.error}
              errorMessage={formState.password.error}
              onValueChange={handleInputChange('password')}
              endContent={
                <button type="button" onClick={() => setIsShowPass(!isShowPass)}>
                  {!isShowPass
                    ? <FaEye size={20} style={{ color: '#4B5563' }} />
                    : <FaEyeSlash size={20} style={{ color: '#9CA3AF' }} />
                  }
                </button>
              }
            />

            <Input
              value={formState.confirm_password.value}
              label="Confirmar Contraseña"
              placeholder="Vuelve a ingresar tu contraseña"
              type={!isShowPass ? "password" : "text"}
              variant="bordered"
              isInvalid={!!formState.confirm_password.error}
              errorMessage={formState.confirm_password.error}
              onValueChange={handleInputChange('confirm_password')}
            />

            {isLoading
              ? <div className="flex justify-center">
                  <CircularProgress size='md' color='default' />
                </div>
              : !isFormInvalid && (
                  <CustomButton
                    color="default"
                    variant="bordered"
                    startContent={<FaSave className="text-secondary_two" />}
                    onClick={handleSubmit}
                    title="Confirmar"
                  />
                ) 
            }

          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default ConfirmPassword
