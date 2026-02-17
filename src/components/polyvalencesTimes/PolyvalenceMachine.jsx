import React, {useState} from 'react'
import { useRecoilState } from 'recoil'
import { MyOperationsPoly, setOperPolyvalence } from '../../infraestructure/states/states_polyvalence'
import { fetchGetData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import { timeToSeconds } from '../../ui/utils'
import { CircularProgress, Progress } from '@nextui-org/react'

const PolyvalenceMachine = ({idx, machine, machineSelect, setMachineSelect}) => {

  const [ operPoly, setOperPoly ] = useRecoilState(setOperPolyvalence)
  const [ operationsPoly, setOperationsPoly ] = useRecoilState(MyOperationsPoly)
  
  const [ machinePercent, setMachinePercent ] = useState(0)
  const [ isLoading, setIsLoading ] = useState(false)

  const handleMachine = () => {
    setMachineSelect(machine)

    const oper_id = operPoly.id

    const getData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchGetData(`${urlMain}polyvalences_times/samplings_detail?oper_id=${oper_id}&machine=${machine.machine}`);

        const resultWithPercent = result.map(operation => {
          const samplingsWithPercent = operation.samplings.map(sampling => ({
            ...sampling,
            percent: Math.round((operation.sam_seg / timeToSeconds(sampling.sample)) * 100)
          }));

          const total_percent = samplingsWithPercent.length > 0
            ? Math.round(
                samplingsWithPercent.reduce((acc, s) => acc + s.percent, 0) / samplingsWithPercent.length
              )
            : 0;
          
          return {
            ...operation,
            samplings: samplingsWithPercent,
            total_percent
          };
        });

        const allPercents = resultWithPercent.flatMap(op => op.samplings.map(s => s.percent));
        const totalMachinePercent = allPercents.length > 0
          ? Math.round(allPercents.reduce((acc, p) => acc + p, 0) / allPercents.length)
          : 0;

        
        setMachinePercent(totalMachinePercent);

        setOperationsPoly(resultWithPercent);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }

  return (
    <>
  
      <span
        onClick={()=> handleMachine(machine)}
        key={idx}
        className={`cursor-pointer font-bold ${machineSelect.machine === machine.machine ? 'text-secondary_two' : 'text-zinc-700'} bg-zinc-200 text-xs rounded-full px-2 py-0.5`} 
      >
        
        {
        isLoading ? 
          <>
            <small>Cargando</small>
            <Progress isIndeterminate  className="max-w-md" size="sm" color='default' />
          </> :
          <>
            {machine.machine} {" "} 
            {
              ` ${machine.average_percent}%`
            }
          </>
        }
        {
          
        }
      </span>
           
      
    </>
    
  )
}

export default PolyvalenceMachine