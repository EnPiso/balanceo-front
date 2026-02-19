const OperationListImport = ({ operationsData, minimunColumn }) => {


  return(

    <div className="py-3">

      {operationsData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100">
            <thead>
              <tr className="bg-transparent text-zinc-600 dark:text-zinc-400 border-b border-zinc-300 dark:border-zinc-600">
                <th className="px-4 py-2 text-left font-medium text-xs md:text-sm lowercase">Operación</th>
                <th className="px-4 py-2 text-left font-medium text-xs md:text-sm lowercase">SAM</th>
                <th className="px-4 py-2 text-left font-medium text-xs md:text-sm lowercase">Máquina</th>
                {!minimunColumn && (
                  <>
                    <th className="px-4 py-2 text-left font-medium text-xs md:text-sm lowercase">Repeticiones</th>
                    <th className="px-4 py-2 text-left font-medium text-xs md:text-sm lowercase">Observaciones</th>
                    <th className="px-4 py-2 text-left font-medium text-xs md:text-sm lowercase">Tipo de guía</th>
                    <th className="px-4 py-2 text-left font-medium text-xs md:text-sm lowercase">Prenda</th>
                    <th className="px-4 py-2 text-left font-medium text-xs md:text-sm lowercase">Orden</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {operationsData.map((op, index) => (
                <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors">
                  <td className="px-4 py-2 border border-gray-100 dark:border-transparent text-xs md:text-sm lowercase">{op.operation}</td>
                  <td className="px-4 py-2 border border-gray-100 dark:border-transparent text-xs md:text-sm lowercase">{op.sam ? op.sam.toFixed(3) : "Error en el formato"}</td>
                  <td className="px-4 py-2 border border-gray-100 dark:border-transparent text-xs md:text-sm lowercase">{op.machine_name}</td>
                  {!minimunColumn && (
                    <>
                      <td className="px-4 py-2 border border-gray-100 dark:border-transparent text-xs md:text-sm lowercase">{op.repetitions}</td>
                      <td className="px-4 py-2 border border-gray-100 dark:border-transparent text-xs md:text-sm lowercase">{op.observations}</td>
                      <td className="px-4 py-2 border border-gray-100 dark:border-transparent text-xs md:text-sm lowercase">{op.guideType}</td>
                      <td className="px-4 py-2 border border-gray-100 dark:border-transparent text-xs md:text-sm lowercase">{op.garment}</td>
                      <td className="px-4 py-2 border border-gray-100 dark:border-transparent text-xs md:text-sm lowercase">{op.order}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-xs md:text-sm lowercase">No se han extraído datos de operaciones</p>
      )}
    </div>
  )
};

export default OperationListImport;
