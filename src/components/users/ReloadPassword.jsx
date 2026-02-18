import { CircularProgress, Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaArrowLeft, FaKey, FaRecycle, FaRegCircle } from 'react-icons/fa'
import { updateDataToken } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import { useRecoilState } from 'recoil'
import { tokenMemory } from '../../infraestructure/states/states_views'
import toast from 'react-hot-toast'

const ReloadPassword = ({user}) => {
  const [token, setToken] = useRecoilState(tokenMemory);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    
      const data = {
        user: {
          is_change_confirmation: false,
          password: 'balanceo',
          password_confirmation: 'balanceo',
        }
      }
      handleApi(data)
      
    }
  
    const handleApi = (data) => {
      const updatePassword = async () => {
        
        const user_id = user.id
        
        setIsLoading(true)
        try {
          const result = await updateDataToken(urlMain + `users/${user_id}`, data, token)
  
          
          toast.success(`ya puedes iniciar sesión con ${user.name} y cambiar la contraseña `)
        } catch (error) {
          console.error('Error setting data', error);
        } finally {
          setIsLoading(false)
        }
      };
  
      updatePassword();
    }
  

  return (
    <div>
      {user && user.activate && (
        <>
          {isLoading ? (
            <CircularProgress size="sm" className="text-secondary_two" />
          ) : (
            <Tooltip
              content="Cambiar contraseña. Clave temporal: balanceo"
              placement="left"
            >
              <button onClick={handleSubmit} className="mr-2">
                <FaKey size={20} className="text-zinc-500" />
              </button>
            </Tooltip>
          )}
        </>
      )}
    </div>
  )
}

export default ReloadPassword