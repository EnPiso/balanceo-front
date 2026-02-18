// hooks/useOpers.js
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {allOpers, selectProdPlant} from "../../../infraestructure/states/opers_states.js";
import {fetchGetData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";



const useOpers = () => {
  const [opers, setOpers] = useRecoilState(allOpers);
  const [prodPlant, setProdPlant] = useRecoilState(selectProdPlant)


  useEffect(() => {
    const getData = async () => {
      const module_id = prodPlant.module.id
      try {
        const data = await fetchGetData(`${urlMain}opers?module_id=${module_id}`);
        setOpers(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    getData();
  }, [prodPlant]);

  return opers;
};

export default useOpers;
