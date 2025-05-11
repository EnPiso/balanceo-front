import React from 'react'
import { FaClock } from 'react-icons/fa6'
import { colorFormatPercent } from '../../../../../infraestructure/utils/colors'
import { Chip } from '@nextui-org/react'
import PercentSamplesZones from '../../../../../ui/PercentageBox'

const CardSample = ({title, description}) => (
  <div className="text-center">
    <h3 className="text-sm font-bold text-zinc-800 dark:text-white">
      {title}
    </h3>
    <p className="text-lg font-semibold text-secondary_two dark:text-gray-200">
      {description}
    </p>
  </div>
)

const CardSamplePercent = ({title, description}) => (
  <div className="text-center">
    <h3 className="text-sm font-bold text-zinc-800 dark:text-white">
      {title}
    </h3>
    
      <PercentSamplesZones value={parseInt(description)} />
   
    
  </div>
)

//colorFormatPercent



const SamplesGlobalCard = ({cycles, totalSeconds, total_sam, potential, potentialUds, handleFunction}) => {
  return (
    <div>
      <hr className="border-secondary_two"/>
      <div className={`grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-${handleFunction ? '6' : '5'} gap-2 p-2 bg-zinc-100`}>
        {/* Tarjeta 1: Ciclos */}
        <CardSample
          title={"Ciclos"}
          description={`${cycles}`}
        />
        <CardSample
          title={"Total tiempo"}
          description={`${totalSeconds} s`}
        />
        <CardSample
          title={"Total SAM"}
          description={`${total_sam}`}
        />
       
        <CardSample
          title={"Potencial uds"}
          description={`${potentialUds}`}
        />

        <CardSamplePercent
          title={"Potencial"}
          description={`${potential}`}
        />
        {
          handleFunction && 
            <div className="flex justify-center">
              <button onClick={handleFunction} className="relative">
                <FaClock
                  className="w-11 h-11 rounded-full object-cover text-primary_one"
                  style={{
                    border: `3px solid #fb2c36`, // Azul personalizado con 6px de grosor
                  }}
                />
                <span className="absolute bottom-0 left-6 w-8 h-8 flex items-center justify-center rounded-full">
                  <img
                    className="w-full h-full object-contain"
                    src="https://balance-assets.sfo3.digitaloceanspaces.com/assets/shirt.png"
                    alt="shirt"
                  />
                </span>
              </button>
            </div>
        }
        
        
      </div>
      <hr className="border-secondary_two"/>
    </div>
  )
}

export default SamplesGlobalCard