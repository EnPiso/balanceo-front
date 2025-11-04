import { useState } from 'react';
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import CustomButton from '../../ui/CustomButton';
import { FaBackward, FaEye, FaEyeSlash, FaSave } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado
import IconMain from '../views/IconMain';
import { postData, postSession } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { currentUser, isShowModalLogIn, temporalTokenObj, tokenMemory } from '../../infraestructure/states/states_views';
import { CircularProgress } from '@nextui-org/react';
import VerifyAccount from './VerifyAccount';

const LoginForm = ({isLogin, setIsLogin, accountDelete, setAccountDelete}) => { 

  const [user, setUser] = useRecoilState(currentUser); 

  const [isModalLogIn, setIsModalLogIn] = useRecoilState(isShowModalLogIn); 
  const [token, setToken] = useRecoilState(tokenMemory);
  
  const [tokenTemporal, setTokenTemporal] = useRecoilState(temporalTokenObj);

  const [formState, setFormState] = useState({
    email: { value: '', error: '' },
    password: { value: '', error: '' }
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isShowPass, setIsShowPass] = useState(false);


  const validateEmail = (email) => {
    return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleInputChange = (field) => (value) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: {
        value,
        error: '' // Reseteamos el error al escribir
      }
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newFormState = { ...formState };

    if (!validateEmail(formState.email.value)) {
      newFormState.email.error = "Por favor, ingresa un email válido.";
      isValid = false;
    }

    if (formState.password.value.length < 6) {
      newFormState.password.error = "La contraseña debe ser mayor a 6 dígitos.";
      isValid = false;
    }

    setFormState(newFormState);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {

    

    handleSessionApi()
    }
  };

  const handleSessionApi = () => {
    const data = {
      user: { 
        email: formState.email.value, 
        password: formState.password.value 
      }
    }

    const initSession = async () => {
      setIsLoading(true);
      try {
        const result = await postSession(urlMain + "login", data);

        if (result && result.data?.status?.data?.user) {

          if(!result.data?.status?.data?.user.activate){
            setAccountDelete(true)
            return false
          }
          
          const user = result.data.status.data.user;
          const token = result.token;

          if (user.is_change_confirmation) {
            if (token) {
              setUser(user);
              setToken(token);
              localStorage.setItem('token', token);
            }

            toast.success("Sesión iniciada");
            setIsModalLogIn(false);
          } else {
            toast("Debes completar la configuración antes de continuar", { icon: "⚠️" });
            const data = {
              user,
              token,
            }
            setTokenTemporal(data);
            // Aquí puedes redirigir o mostrar un modal
          }
        }
        
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false);
      }
    };


    initSession();

  }


  const isFormInvalid = 
    formState.email.value === '' || 
    formState.password.value.length < 6 || 
    !validateEmail(formState.email.value);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          {
            accountDelete ? 
              <VerifyAccount/> :
              <Card className="max-w-md w-full">
                <CardBody>
                  <div className="flex flex-col gap-4">
                      <Input
                        value={formState.email.value}
                        label="Email"
                        placeholder="Ingresa tu email"
                        type="email"
                        variant="bordered"
                        isInvalid={!!formState.email.error}
                        errorMessage={formState.email.error}
                        onValueChange={handleInputChange('email')}
                      />
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
                          <button onClick={() => setIsShowPass(!isShowPass)}>
                            {
                              !isShowPass ? <FaEye size={24} style={{color: '#4B5563'}}/> : <FaEyeSlash size={24} style={{color: '#9CA3AF'}}/>
                            }
                          </button>
                        }
                      />
                      {
                        isLoading ?
                          <div className="flex justify-center">
                            <CircularProgress 
                                size='md' 
                                color='default'/>
                          </div> :
                          <>
                            {
                              !isFormInvalid && 
                                <CustomButton
                                  color="default"
                                  variant="bordered"
                                  startContent={<FaSave className=" text-secondary_two"/>}
                                  onClick={handleSubmit}
                                  title="Iniciar sesión"
                                />
                            }
                          </>
                      }

                    </div>
                </CardBody>
              </Card>
            
          }
    </div>
  );
}

export default LoginForm