import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { FaClock } from 'react-icons/fa6'
import { useRecoilState } from 'recoil'
import { operationsSamples } from '../../../../../infraestructure/states/states_samples'
import ObjOperationSample from './ObjOperationSample'

const ListOperationsSamples = () => {


  const [isSample, setIsSample] = useState(false)

  const [samplesClock, setSamplesClock] = useState([])
  

  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples)
  

  const handleSample = (sample) => {
    setIsSample(sample)
    console.log(sample)
  }

  return (

    <>
    <h1 className="text-left uppercase font-bold text-xl mb-2 ">
      Operaciones
    </h1>
      {
        samplesOperations.map((sampleOperation, i)=> {
            return  (
              <ObjOperationSample
                samplesClock={samplesClock}
                setSamplesClock={setSamplesClock}
                isSample={isSample}
                setIsSample={setIsSample}
                sampleOperation={sampleOperation}
                key={i}
              />
            )
          })
      }
    </>

    

  )
}

export default ListOperationsSamples