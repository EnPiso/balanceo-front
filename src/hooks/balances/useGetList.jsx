// hooks/useOpers.js
import { useEffect, useState } from 'react';
import {fetchGetData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";


const useGetList = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await fetchGetData(`${urlMain}/${url}`);
        setData(result);
        setError(null);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url]);
  return { data, loading, error };
};

export default useGetList;
