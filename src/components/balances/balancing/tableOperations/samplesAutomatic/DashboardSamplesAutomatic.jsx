import React from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import ListSamplesAutomatic from './ListSamplesAutomatic'

const DashboardSamplesAutomatic = ({setIsAutomatic}) => {
  return (
    <div>
      <ListSamplesAutomatic
        setIsAutomatic={setIsAutomatic}
      />
    </div>
  )
}

export default DashboardSamplesAutomatic