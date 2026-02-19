import React, { useEffect, useState } from 'react';
import { fetchGetData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import { machinesResultFormat } from '../../infraestructure/data/machinesResult';
import { Checkbox, CircularProgress, Progress } from '@nextui-org/react';
import ObjGraphResult from './ObjGraphResult';
import CustomPaginator from '../../ui/CustomPaginator';
import PerPageSelector from '../../ui/PerPageSelector';

const ListGraphResults = () => {
  const [opers, setOpers] = useState([]);
  const [isFormat, setIsFormat] = useState('');
  const [formatMachine, setFormatMachine] = useState([]);
  const [operShow, setOperShow] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(5); // Total de páginas
  const [actualEntries, setActualEntries] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        //(`${urlMain}polyvalences_times?page=${currentPage}&per_page=${perPage}&q[name_or_id_oper_cont]=${encodeURIComponent(queryString)}`);
        
        const result = await fetchGetData(`${urlMain}graph_results?page=${currentPage}&per_page=${perPage}`);

        
        result.total_pages && setTotalPages(result.total_pages)
        result.current_page && setCurrentPage(result.current_page)
        setOpers(result.data);
        setActualEntries(result.actual_entries || 0);
        setTimeout(()=> {
          setActualEntries(0)
        }, 4000)
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [currentPage, perPage]);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  
  };

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

            {
              actualEntries > 0 &&
                <div className="text-end mb-4 text-secondary_two">
                  <small>
                    {`Mostrando ${actualEntries} de ${perPage}`}
                  </small>
                </div>
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

      <div className="flex justify-end items-center gap-3 px-2 py-4">
        <CustomPaginator
          total={totalPages}
          initialPage={currentPage}
          onChange={handlePageChange}
        />
        <PerPageSelector perPage={perPage} onChange={(p) => { setPerPage(p); setCurrentPage(1); }} />
      </div>
    </div>
  );
};

export default ListGraphResults;
