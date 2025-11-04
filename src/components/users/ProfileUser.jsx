import { Card, CardBody, CircularProgress, Input, Tooltip } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FaUserAltSlash } from 'react-icons/fa'
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
      <CardBody>
        <div className="mt-2 p-2 rounded-lg">
          {
            isEdit ?
              <>
                {
                  isLoadingEdit ?
                    <CircularProgress size='23' color="default"/> :
                    <>
                      <Tooltip content={"ENTER/ESC"}>
                        <Input
                          size="sm"
                          onKeyDown={handleKeyDown}
                          value={name.value}
                          label="Nombre"
                          placeholder="Ingresa tu nombre"
                          variant="bordered"
                          isInvalid={!!name.error}
                          errorMessage={name.error}
                          onValueChange={handleInputChange}
                          className="max-w-xs"
                        />
                      </Tooltip>
                    </>
                }
              </> :
              <Tooltip content="Click para editar su nombre" placement='right' >
                <button onClick={()=> setIsEdit(true)}>
                  <h1 className="text-secondary_two text-xl capitalize">{user?.name}</h1>
                </button>
              </Tooltip>
          }
          
          
          
          

          <p className="text-zinc-600">{user?.email}</p>
          <p className="text-zinc-600">{user?.role === 'admin' ? 'administrador' :  user?.role}</p>
          
          <div className="flex justify-end items-center">
            <CustomButton
              color="default"
              variant="bordered"
              startContent={<FaUserAltSlash className="text-red-500" />}
              onClick={() => setShowDelete(true)}
              title="Cerrar sesión"
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
