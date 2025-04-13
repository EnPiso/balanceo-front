import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { listOpersCustom, masterOpersList, opersListModules } from '../../infraestructure/states/opers_states';
import { updateData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import toast from 'react-hot-toast';

const AutocompleteOpersMaster = ({setIsOpen}) => {
  const [opersModules, setOpersModules] = useRecoilState(opersListModules);

  const [defaultModule, setDefaultModule] = useState(null);

  const [masterOpers, setMasterOpers] = useRecoilState(masterOpersList)

  const [opersCustom,setOpersCustom] = useRecoilState(listOpersCustom)
  

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
    
    const selectedCategory = modules.find((m) => String(m.id) === String(selectedKey));
    
    if (selectedCategory) {
     
      const oper_id = oper.id;
      const module_id = selectedCategory.id;
  
      const data = {
        oper: {
          production_module_id: module_id,
          id: oper_id
        }
      };
      updateOperModule(data);
    } else {
      console.warn("⚠️ Módulo no encontrado para selectedKey:", selectedKey);
    }
  };

  const updateOperModule = async (data) => { 
    try {
      const result = await updateData(urlMain + `production_modules/update_oper_production_modules`, data)
      const  updateOpers = masterOpers.map(item => item.id === result.id ? result : item);
      setMasterOpers(updateOpers)
      toast.success("Se ha actualizado el módulo del operario correctamente")
      setIsOpen(false)
      const updatedOpersCustom = opersCustom.filter((oper) => oper.id !== result.id);
      setOpersCustom(updatedOpersCustom);
      debugger
      // setOpersCustom()
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