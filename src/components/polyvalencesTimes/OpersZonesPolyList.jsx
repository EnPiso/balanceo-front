import React from 'react'
import { useRecoilState } from 'recoil'
import { opersZonesPoly } from '../../infraestructure/states/states_polyvalence'
import PercentSamplesZones from '../../ui/PercentageBox'
import TextColorPercent from './TextColorPercent'

const OpersZonesPolyList = () => {
  const [opersZonesPolyvalence] = useRecoilState(opersZonesPoly)

  const selectColor = (value) => {
    let color = '';
  
    if (value < 60) {
      color = 'text-red-500';
    } else if (value >= 60 && value < 80) {
      color = 'text-yellow-500';
    } else if (value >= 80 && value <= 100) {
      color = 'text-green-500';
    } else {
      color = 'text-blue-500';
    }
    return color
  }
  return (
    <div>
      {
        opersZonesPolyvalence.opers_zones_by_opers_balancing?.length >= 1 && 
          <div className="mt-3">
            <div>
              <div className="flex flex-wrap gap-2 ">
                {opersZonesPolyvalence.opers_zones_by_opers_balancing?.map((item, i) => (
                  <div key={i} className="flex flex-wrap gap-2 bg-zinc-100 px-2 py-2 rounded-md">
                    <span
                      className={`font-bold ${selectColor(item.sample_general_percent)}`} 
                    >
                      {Math.round(item.sample_general_percent)} %
                    </span>
                    
               
                    {item.opers_zones.map((zone, idx) => (
                      <span
                        key={idx}
                        className="font-bold text-zinc-800 text-xs rounded-full px-2 py-0.5 shadow-sm"
                      >
                        <TextColorPercent value={Math.round(zone.sample)} />  
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default OpersZonesPolyList