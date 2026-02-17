import React, { useEffect, useState } from 'react';
import { fetchGetData } from '../../../infraestructure/call_api/crud';
import { urlMain } from '../../../infraestructure/data/const';
import { Autocomplete, AutocompleteItem, Spinner } from '@nextui-org/react';

const SelectManualPlantModule = (
  {
    modulesPlant,
    setModulesPlant,
    isModuleSelect,
    setIsModuleSelect,
    setSelectModule,
    isOriginal
  }) => {

  const [isLoading, setIsloading] = useState(false);
  const [inputValue, setInputValue] = useState(""); // Estado para controlar el valor del input

  useEffect(() => {
    if (isModuleSelect) {
      handleApi();
    }
  }, [isModuleSelect]);

  const handleApi = async () => {
    try {
      setIsloading(true);
      const result = await fetchGetData(`${urlMain}products/plant_module_name`);
      const filteredResult = result.filter(
        (item) => item.plant_module_name && item.plant_module_name.trim() !== ''
      );
      setModulesPlant(filteredResult);
      console.log(filteredResult);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setIsloading(false);
    }
  };

  const handleSelect = (selectedKey) => {
    const selectedCategory = modulesPlant.find(
      (m) => String(m.index) === String(selectedKey)
    );
    
    setSelectModule(selectedCategory.plant_module_name);
  };

  const handleInputChange = (value) => {
    setInputValue(value); // Actualizar el valor del input
    if (value === "") {
      // Si el valor es vacío, significa que se hizo clic en la "X"
      setSelectModule(""); // Limpiar el módulo seleccionado
      console.log("El valor del Autocomplete fue borrado.");
    }
  };

  return (
    <div>
      <Autocomplete
        isDisabled={isOriginal}
        onFocus={() => setIsModuleSelect(true)} // Controlar el clic en la flecha o el foco
        onSelectionChange={(selectedKey) => handleSelect(selectedKey)}
        onInputChange={(value) => handleInputChange(value)} // Detectar cambios en el input
        className="max-w-xs"
        defaultItems={isLoading ? [] : modulesPlant} // Mostrar vacío mientras carga
        label="Seleccionar planta y módulo"
        placeholder="Buscar un módulo"
      >
        {isLoading ? (
          <AutocompleteItem  textValue={'...Cargando...'}>
            ...Cargando...
          </AutocompleteItem>
        ) : (
          modulesPlant.map((item) => (
            <AutocompleteItem key={item.index} textValue={item.plant_module_name}>
              {item.plant_module_name}
            </AutocompleteItem>
          ))
        )}
      </Autocomplete>
    </div>
  );
};

export default SelectManualPlantModule;