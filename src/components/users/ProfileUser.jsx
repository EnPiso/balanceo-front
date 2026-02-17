import { Card, CardBody, CircularProgress, Input, Tooltip } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FaUserAltSlash, FaUserCircle } from 'react-icons/fa'
import CustomButton from '../../ui/CustomButton'
import { ConfirmDeleteOper } from '../opers/ConfirmDeleteOper'
import { updateDataToken } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import toast from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { currentUser, tokenMemory } from '../../infraestructure/states/states_views'

const ProfileUser = ({ handleClose }) => {
  const [showDelete, setShowDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Estado limpio
  const [name, setName] = useState({ value: '', error: '' })

  const [isEdit, setIsEdit] = useState(false)

  const [token, setToken] = useRecoilState(tokenMemory);
  const [user, setUser] = useRecoilState(currentUser);
  
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)


  useEffect(() => {
    if (user?.name) {
      setName({ value: user.name, error: '' })
    }
  }, [user])

  const handleInputChange = (value) => {
    let errorMsg = ''
    if (value.trim().length > 0 && value.trim().length <= 2) {
      errorMsg = 'Debe tener más de 2 caracteres'
    }

    setName({
      value,
      error: errorMsg
    })
  }


  const handleKeyDown = (event) => {
      if (event.key === "Enter") {
          handleApi()
      }else if ((event.key === "Escape")){
          setIsEdit(false)
      }
  };

  const handleApi = () => {
    const user_id = user.id
    const nameUpdate = name.value

    const data = {
      user: {
        name: nameUpdate
      }
    }

    const updatePassword = async () => {
      setIsLoadingEdit(true)
      try {
        const result = await updateDataToken(urlMain + `users/${user_id}`, data, token)
        console.log(user)
        setUser(result.user)
        toast.success( `Se actualizó ${result.user.name},  correctamente`)
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsEdit(false)
        setIsLoadingEdit(false)
      }
    };

    updatePassword();
    
    
  }

  return (
    <Card>
      <CardBody className="p-6">
        {/* Información del usuario */}
        <div className="space-y-4">
          {/* Nombre */}
          <div className="pb-4 border-b border-gray-200">
            {
              isEdit ?
                <>
                  {
                    isLoadingEdit ?
                      <div className="flex justify-start">
                        <CircularProgress size='md' color="default"/>
                      </div> :
                      <>
                        <Tooltip content={"ENTER para guardar / ESC para cancelar"}>
                          <Input
                            size="lg"
                            onKeyDown={handleKeyDown}
                            value={name.value}
                            label="Nombre"
                            placeholder="Ingresa tu nombre"
                            variant="bordered"
                            isInvalid={!!name.error}
                            errorMessage={name.error}
                            onValueChange={handleInputChange}
                          />
                        </Tooltip>
                      </>
                  }
                </> :
                <Tooltip content="Click para editar su nombre" placement='right'>
                  <button onClick={()=> setIsEdit(true)} className="w-full text-left">
                    <h1 className="text-secondary_two text-2xl font-semibold capitalize hover:underline">
                      {user?.name}
                    </h1>
                  </button>
                </Tooltip>
            }
          </div>

          {/* Email y Rol */}
          <div className="space-y-3 py-4 border-b border-gray-200">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Email</span>
              <p className="text-sm text-gray-700 mt-1">{user?.email}</p>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Rol</span>
              <p className="text-sm text-gray-700 mt-1 capitalize">
                {user?.role === 'admin' ? 'Administrador' : user?.role}
              </p>
            </div>
          </div>

          {/* Botón de cerrar sesión */}
          <div className="pt-4">
            <CustomButton
              color="default"
              variant="bordered"
              startContent={<FaUserAltSlash className="text-red-500" />}
              onClick={() => setShowDelete(true)}
              title="Cerrar sesión"
              className="w-full"
            />
          </div>
        </div>
      </CardBody>

      <ConfirmDeleteOper
        isLoading={isLoading}
        isOpen={showDelete}
        setIsOpen={setShowDelete}
        handleSave={handleClose}
        title="¿Quieres cerrar sesión?"
        description={user?.name}
      />
    </Card>
  )
}

export default ProfileUser
