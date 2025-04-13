import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { masterOpersList, opersListModules } from '../../infraestructure/states/opers_states';
import { updateData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import toast from 'react-hot-toast';

const AutocompleteOpersMaster = () => {
  const [opersModules, setOpersModules] = useRecoilState(opersListModules);

  const [defaultModule, setDefaultModule] = useState(null);

  const [masterOpers, setMasterOpers] = useRecoilState(masterOpersList)

  const { oper, modules } = opersModules;

  useEffect(() => {
    if (modules?.length > 0 && oper) {
      const moduleFind = modules.find((module) => module.id === oper.production_module_id);
      if (moduleFind) {
        setDefaultModule(moduleFind);
      }
    }
  }, [opersModules]);

  const handleClick = (selectedKey) => {
    // Busca el elemento seleccionado usando el índice
    const selectedCategory = modules[selectedKey - 1];
    
    if (selectedCategory) {
      console.log(selectedCategory, oper);

      const oper_id = oper.id;
      const module_id = selectedCategory.id;

      const data = {
        oper: {
          production_module_id: module_id,
          id: oper_id
        }
      }
      updateOperModule(data)
    }
  }

  const updateOperModule = async (data) => {
      
    try {
      const result = await updateData(urlMain + `production_modules/update_oper_production_modules`, data)
      const  updateOpers = masterOpers.map(item => item.id === result.id ? result : item);
      setMasterOpers(updateOpers)
      toast.success("Se ha actualizado el módulo del operario correctamente")
    } catch (error) {
      console.error('Error setting data', error);
    } 
  };


  return (
    <Autocomplete
      key={defaultModule ? defaultModule.id : 'default'} // Forzar actualización
      className="w-full"
      defaultItems={modules}
      label="Cambiar módulo"
      size="sm"
      defaultSelectedKey={defaultModule ? String(defaultModule.id) : ''}
      onSelectionChange={(selectedKey) => {
        handleClick(selectedKey)
      }}
    >
      {(item) => <AutocompleteItem key={item.id}>{item.full_name}</AutocompleteItem>}
    </Autocomplete>
  );
};

export default AutocompleteOpersMaster;