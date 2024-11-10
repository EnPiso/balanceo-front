// hooks/useOpers.js
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {allOpers} from "../../../infraestructure/states/opers_states.js";
import {fetchGetData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";



const useOpers = () => {
  const [opers, setOpers] = useRecoilState(allOpers);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchGetData(`${urlMain}/opers`);
        setOpers(data);
        console.log(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    getData();
  }, []);

  return opers;
};

export default useOpers;
