import React, { useEffect, useState } from 'react';
import { fetchGetData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import { machinesResultFormat } from '../../infraestructure/data/machinesResult';
import { Checkbox, CircularProgress, Progress } from '@nextui-org/react';
import ObjGraphResult from './ObjGraphResult';

const ListGraphResults = () => {
  const [opers, setOpers] = useState([]);
  const [isFormat, setIsFormat] = useState('');
  const [formatMachine, setFormatMachine] = useState([]);
  const [operShow, setOperShow] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchGetData(`${urlMain}graph_results`);
        console.log(result);
        
        setOpers(result);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (!isFormat) {
      setFormatMachine([]);
      return;
    }

    const normalizeKeys = {
      pl: ['pl'],
      fi: ['fi', 'fl'],
      rec: ['re'],
    };

    const grouped = opers.map((oper) => {
      const samplings = oper.samplings || [];
      const result = [];

      for (const key of machinesResultFormat) {
        const prefixes = normalizeKeys[key];

        if (!prefixes) continue;

        const machines = samplings.filter((s) =>
          prefixes.some((prefix) =>
            s.machine?.toLowerCase().startsWith(prefix)
          )
        );

        if (machines.length > 0) {
          const total = machines.reduce(
            (sum, m) => sum + m.average_percent,
            0
          );
          const avg = Math.round(total / machines.length);
          result.push({
            machine: key.toUpperCase(),
            average_percent: avg,
            samplings: machines.flatMap((m) => m.samplings || []),
          });
        }
      }

      return {
        ...oper,
        samplings: result,
      };
    });

    setFormatMachine(grouped);
  }, [isFormat, opers]);

  return (
    <div>
      
      {
        isLoading ? 
          <div className="flex justify-center  py-6">
            <CircularProgress size='lg' color='default'/>
            <br />
            <div className='text-center'>
              <small>Cargando</small>
              <Progress isIndeterminate  className="max-w-md" size="sm" color='default' />
            </div>
          </div> :
          <>
            {
              !operShow && 
                <>
                  <Checkbox
                    color="default"
                    isSelected={!!isFormat}
                    onValueChange={(val) => setIsFormat(val)}
                    className="ml-2"
                  />
                  <label className="ml-2">
                    {isFormat ? 'Máquinas por categoría' : 'Todas las máquinas'}
                  </label>
                </>
                
            }
            {(isFormat ? formatMachine : opers)
              .filter(oper => !operShow || oper.id_oper === operShow.id_oper)
              .map((oper, i) => (
                <ObjGraphResult
                  key={i}
                  i={i}
                  oper={oper}
                  setOperShow={setOperShow}
                  operShow={operShow}
                  opers={opers}
                />
              ))
            }
          </>
      }

      
    </div>
  );
};

export default ListGraphResults;
