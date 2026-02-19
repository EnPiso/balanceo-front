import React, { useEffect, useState } from 'react'
import { userAvatarImage } from '../../infraestructure/data/links'
import { RadarChart } from './RadarChart'
import ImageLightboxResult from './ImageLightBoxResult'
import PercentSamplesZones from '../../ui/PercentageBox'

const ObjGraphResult = ({ i, oper, setOperShow, operShow, opers }) => {
  const [arraySamplings, setArraySamplings] = useState([])
  const [average, setAverage] = useState(0)
  const isExpanded = operShow?.id_oper === oper.id_oper

  const hasSamplings = oper.samplings.length > 0
  const hasQuestionnaires = oper.questionnaires.length > 0
  const radarCount = [hasSamplings, hasQuestionnaires].filter(Boolean).length

  useEffect(() => {
    if (arraySamplings.length > 0) {
      const total = arraySamplings.reduce((acc, curr) => acc + curr.average_percent, 0)
      setAverage(total / arraySamplings.length)
    } else if (opers.length > 0) {
      const total = opers.reduce((acc, curr) => acc + curr.average_percent, 0)
      setAverage(total / opers.length)
    }
  }, [arraySamplings, opers])

  return (
    <div key={i} className="w-full bg-white rounded-xl shadow-md p-4 mb-4">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        {oper.avatar ? (
          <ImageLightboxResult thumbnailUrl={oper.avatar} fullSizeUrl={oper.avatar} />
        ) : (
          <img src={userAvatarImage} className="w-24 h-24 rounded-full object-cover border" />
        )}
        <div>
          <p className="text-xl font-semibold text-gray-800">{oper.oper_name}</p>
          <p className="text-sm text-gray-500">Cédula: {oper.id_oper}</p>
          {average >= 1 && (
            <div className="mt-2">
              <PercentSamplesZones value={average} />
            </div>
          )}
        </div>
      </div>

      {/* Contenido dinámico */}
      <div
        className={`w-full ${
          radarCount === 1
            ? 'flex justify-center'
            : isExpanded
            ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
            : 'flex flex-wrap lg:flex-nowrap gap-6'
        }`}
      >
        {/* SAMPLINGS */}
        {hasSamplings && (
          <div className="flex flex-col items-center w-full lg:w-1/2">
            <div onClick={() => setOperShow(oper)} className="cursor-pointer">
              <RadarChart
                setArraySamplings={setArraySamplings}
                data={oper.samplings}
                size={isExpanded ? 440 : 340}
              />
            </div>

            {isExpanded && (
              <div className="w-full mt-4 bg-gray-100 p-4 rounded shadow-sm">
                <h3 className="font-semibold mb-2">Muestras por máquina</h3>
                <table className="w-full bg-white rounded border">
                  <thead className="bg-zinc-800 text-white">
                    <tr>
                      <th className="p-2 border text-center">Máquina</th>
                      <th className="p-2 border text-center">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {oper.samplings.map((value, index) => (
                      <tr key={index} className="hover:bg-zinc-100">
                        <td className="p-2 border text-center">
                          {typeof value.machine === 'object' ? value.machine?.machine : value.machine}
                        </td>
                        <td className="p-2 border text-center">
                          <PercentSamplesZones value={value.average_percent} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* QUESTIONNAIRES */}
        {hasQuestionnaires && (
          <div className="flex flex-col items-center w-full lg:w-1/2">
            <div onClick={() => setOperShow(oper)} className="cursor-pointer">
              <RadarChart
                setArraySamplings={setArraySamplings}
                data={oper.questionnaires}
                size={isExpanded ? 440 : 340}
              />
            </div>

            {isExpanded && (
              <div className="w-full mt-4 bg-gray-100 p-4 rounded shadow-sm">
                <h3 className="font-semibold mb-2">Cuestionarios</h3>
                <table className="w-full bg-white rounded border">
                  <thead className="bg-zinc-800 text-white">
                    <tr>
                      <th className="p-2 border text-center">Título</th>
                      <th className="p-2 border text-center">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {oper.questionnaires.map((value, index) => (
                      <tr key={index} className="hover:bg-zinc-100">
                        <td className="p-2 border text-center">{value.title}</td>
                        <td className="p-2 border text-center">
                          <PercentSamplesZones value={value.average_percent} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botón volver */}
      {isExpanded && (
        <div className="flex justify-end pt-4">
          <button
            onClick={() => setOperShow(null)}
            className="font-bold text-zinc-800"
          >
            Regresar
          </button>
        </div>
      )}
    </div>
  )
}

export default ObjGraphResult
