import { useState } from 'react';
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import CustomButton from '../../ui/CustomButton';
import { FaBackward, FaSave } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado
import IconMain from '../views/IconMain';
import { postData, postSession } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { currentUser, isShowModalLogIn } from '../../infraestructure/states/states_views';
import { CircularProgress } from '@nextui-org/react';

const FormSignup = ({setIsLogin}) => {

  const [user, setUser] = useRecoilState(currentUser); 

  const [isModalLogIn, setIsModalLogIn] = useRecoilState(isShowModalLogIn); 
  

  const [formState, setFormState] = useState({
    name: { value: '', error: '' },
    email: { value: '', error: '' },
    password: { value: '', error: '' }
  });

  const [isLoading, setIsLoading] = useState(false);

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

    if (formState.name.value.length < 2) {
      newFormState.name.error = "El nombre debe ser mayor a 2 dígitos.";
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
        name: formState.name.value,
        email: formState.email.value, 
        password: formState.password.value 
      }
    }

    const initSession = async () => {
      setIsLoading(true)
      try {
        const result = await postSession(urlMain + "login", data)
        if(result && (result.data.status.data.user)){
          setUser(result.data.status.data.user)
          toast.success("Sesión iniciada")
          setIsModalLogIn(false)
        }
        
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false)
      }
    };

    initSession();

  }


  const isFormInvalid = 
    formState.email.value === '' || 
    formState.password.value.length < 6 || 
    formState.name.value.length < 2 || 
    !validateEmail(formState.email.value);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
      <Card className="max-w-md w-full">
        <CardBody>
          <form className="flex flex-col gap-4">
            <Input
              value={formState.name.value}
              label="Nombre"
              placeholder="Ingresa tu nombre"
              type="text"
              variant="bordered"
              isInvalid={!!formState.name.error}
              errorMessage={formState.name.error}
              onValueChange={handleInputChange('name')}
            />
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
              type="password"
              variant="bordered"
              isInvalid={!!formState.password.error}
              errorMessage={formState.password.error}
              onValueChange={handleInputChange('password')}
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
                        title="Crear usuario"
                      />
                  }
                </>
            }

            

            
          </form>
        </CardBody>
        <CardFooter className="flex justify-center text-sm text-gray-500">
          ¿Ya tienes una cuenta? <a onClick={()=> setIsLogin(true)} className="ml-1 cursor-pointer font-bold text-secondary_two">Iniciar sesión</a>
        </CardFooter>
      </Card>
    </div>
  );
}

export default FormSignup