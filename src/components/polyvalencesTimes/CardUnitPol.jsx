import PolyvalenceMachine from './PolyvalenceMachine'
import { CircularProgress, Progress } from '@nextui-org/react'
import TextColorPercent from './TextColorPercent'
import { timeToSeconds } from '../../ui/utils'
import ImageAvatarMaster from '../opers_master/ImageAvatarMaster'
import { useState } from 'react'
import { FaCompress } from 'react-icons/fa'
import { FaObjectGroup } from 'react-icons/fa6'
import ImageCardPol from './ImageCardPol'

const CardUnitPol = ({
  oper,
  setOperPoly,
  setAllMachines,
  operPoly,
  allMachines,
  machineSelect,
  setMachineSelect,
  operationsPoly,
  handleMachine
}) => {

  const [ isLoading, setIsLoading ] = useState(false)

  return(
    <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4 text-right">
        <ImageCardPol image={oper.avatar} />
        <div>
          <div className={`font-bold text-lg 
            ${operPoly && oper.id === operPoly.id ? 'text-secondary_two' : 'text-zinc-500'}`}>
              {oper.name}
          </div>
          <div className="text-xs text-zinc-500">cc {oper.id_oper}</div>
        </div>
      </div>
      {
        !(operPoly && oper.id === operPoly.id && allMachines && allMachines.length >= 1) &&
          <div className="mb-2">
            {isLoading ? (
              <div className="flex justify-start mt-4">
                <Progress isIndeterminate  className="w-24" size="sm" color='success' />
              </div>
            ) : (
              <button
                onClick={() => handleMachine(oper, setIsLoading)}
                className="text-secondary_two font-semibold "
              >
              Ver Máquinas
              </button>
            )}
          </div>
      }
      
      {operPoly && oper.id === operPoly.id && allMachines && allMachines.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {allMachines.map((machine, idx) => (
            <PolyvalenceMachine
              machine={machine}
              idx={idx}
              setMachineSelect={setMachineSelect}
              machineSelect={machineSelect}
              key={idx}
            />
          ))}
        </div>
      )}
      {operPoly && oper.id === operPoly.id && operationsPoly.length >= 1 && (
        <div className="space-y-2">
          {operationsPoly.map((operation, i) => (
            <div key={i} className="p-2 bg-gray-50 rounded shadow-sm">
              <div className="font-semibold text-sm text-gray-700 mb-1">
                {operation.operation}
              </div>
              <div className="flex flex-wrap gap-2">
                {operation.samplings.map((sampling, j) => (
                  <TextColorPercent
                    total_percent={operation.total_percent}
                    key={j}
                    value={Math.round((operation.sam_seg / timeToSeconds(sampling.sample)) * 100)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CardUnitPol