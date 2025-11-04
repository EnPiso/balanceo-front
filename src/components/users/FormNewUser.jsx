import { FaSave } from "react-icons/fa";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { allUsers } from "../../infraestructure/states/states_views.js";
import CustomButton from "../../ui/CustomButton.jsx";
import { urlMain } from "../../infraestructure/data/const.js";
import FormUserField from "./FormUserField.jsx";
import { postData, postDataToken } from "../../infraestructure/call_api/crud.js";
import { isValidEmail } from "../../infraestructure/utils/validate.js";
import SelectRoles from "./SelectRoles.jsx";

const dataDefault = {
  email: "",
  name: "",
  role: "",
  password: "balanceo",
  password_confirmation: "balanceo",
  is_change_password: false
};

const FormNewUser = ({ setIsOpen }) => { 
  const [formData, setFormData] = useState(dataDefault);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useRecoilState(allUsers);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.name || !formData.role) {
      setErrorMessage("Todos los campos son obligatorios");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage("El correo electrónico no es válido");
      return;
    }
    setErrorMessage("");
    
    const newUser = {
      user: formData
    }
    handleApi(newUser)
  };


  const handleApi = (newUser) => {
    setIsLoading(true);
    const postUser = async () => {
      try {
        const result = await postDataToken(urlMain + "users", newUser)
        console.log(result)
        
        const updatedUsers = [...users, result.user];
        setUsers(updatedUsers);
        toast.success("Se ha creado el usuario correctamente");
        
      } catch (error) {
        console.error('Error setting data', error);
        
      } finally {
        setIsLoading(false);
        setIsOpen(false);
      }
    };

    postUser();
  }

  return (
    <div className="dark:bg-gray-100 bg-zinc-200 dark:text-zinc-800 p-4 rounded-lg">
      <div className="flex flex-col gap-4">
        <FormUserField
          placeholder="Email"
          value={formData.email}
          setState={(val) => handleChange("email", val)}
          valueDefault=""
          type="email"
        />

        <FormUserField
          placeholder="Nombre"
          value={formData.name}
          setState={(val) => handleChange("name", val)}
          valueDefault=""
          type="text"
        />

        <SelectRoles
          formData={formData}
          setFormData={setFormData}
        />

        {errorMessage && (
          <span className="text-red-500 text-center font-bold text-sm">
            {errorMessage}
          </span>
        )}
        {
          (isValidEmail(formData.email) && formData.name && formData.role) && (
            <div className="flex justify-end mt-4">
              {isLoading ? (
                <Spinner color="default" size="lg" />
              ) : (
                <CustomButton
                  color="default"
                  variant="bordered"
                  startContent={<FaSave className="text-secondary_two" />}
                  onClick={handleSubmit}
                  title="Guardar"
                />
              )}
            </div>
          )
        }
        
      </div>
    </div>
  );
};

export default FormNewUser;
