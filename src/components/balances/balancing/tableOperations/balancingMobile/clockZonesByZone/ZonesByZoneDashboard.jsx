import React from 'react'
import WatchChrono from '../../../../../samples/WatchChrono'

const ZonesByZoneDashboard = () => {

  const handleSaveTime = (time, setIsLoading) => {
    // Aquí puedes manejar el tiempo guardado
    console.log("Tiempo guardado:", time);
    setIsLoading(false)
  }

  return (
    <div>
      <div className="py-2 mb-2">
        <WatchChrono
          onSaveTime={handleSaveTime} />
      </div>
    </div>
  )
}

export default ZonesByZoneDashboard