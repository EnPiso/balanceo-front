import { Avatar, Chip } from '@nextui-org/react';
import React, { useMemo, useEffect } from 'react';
import ImagesImport from './ImagesImport';
import { nameReferenceProduct } from '../../../ui/utils';
import FormatGarment from './FormatGarment';

const ListMultipleImport = ({ productOperations, setProcessData }) => {
  const processedData = useMemo(() => {
    return productOperations.map(file => {
      const operationsByOrder = file.operations.reduce((acc, operation) => {
        const { order, garment, ...operationData } = operation;
        
        // Obtener detalles del garment
        const parsedGarment = nameReferenceProduct(garment);
        const { name, reference, categoryProduct } = parsedGarment || {};
        
        if (!acc[order]) {
          acc[order] = { garments: {}, images: file.images || [] };
        }

        if (!acc[order].garments[garment]) {
          acc[order].garments[garment] = {
            name,
            reference,
            categoryProduct,
            operations: []
          };
        }

        acc[order].garments[garment].operations.push({
          garment: garment,
          operation: operationData.operation,
          sam: operationData.sam,
          machine_name: operationData.machine_name,
          repetitions: operationData.repetitions,
          observations: operationData.observations,
          guideType: operationData.guideType
        });

        return acc;
      }, {});

      // Convertir el objeto en un array con la estructura correcta
      const transformedOrders = Object.entries(operationsByOrder).map(([order, data]) => ({
        order,
        images: data.images,
        garments: Object.entries(data.garments).map(([garment, garmentData]) => ({
          garment,
          name: garmentData.name,
          reference: garmentData.reference,
          categoryProduct: garmentData.categoryProduct,
          operations: garmentData.operations
        }))
      }));

      return {
        ...file,
        groupedOrders: transformedOrders
      };
    });
  }, [productOperations]);
  
  useEffect(() => {
    setProcessData(processedData);
  }, [processedData, setProcessData]);
  
  return (
    <div className="space-y-6">
      {processedData.map((file, fileIndex) => (
        <div key={fileIndex} className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-right">
            <Chip>
                {fileIndex + 1}
            </Chip> 
          </h3>

          <div className="space-y-4">
            {file.groupedOrders.map((order, orderIndex) => (
              <div key={orderIndex} className="border-l-4 border-blue-700 pl-4">
                <h4 className="text-md font-bold text-gray-700">Orden: {order.order}</h4>
                <div className="py-3">
                  {order.images.map((image, i) => (
                    <ImagesImport key={i} imageUrl={image} />
                  ))}
                </div>
                {order.garments.map((group, groupIndex) => (
                  <div key={groupIndex} className="border-l-4 border-green-700 pl-4 mt-2">
                    <FormatGarment
                      garment={group.garment} 
                      name={group.name} 
                      reference={group.reference} 
                      categoryProduct={group.categoryProduct}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.operations.map((op, opIndex) => (
                        <div key={opIndex} className="text-sm bg-gray-50 p-3 rounded">
                          <p className="font-medium">{op.operation}</p>
                          <p className="text-gray-600">Máquina: {op.machine_name}</p>
                          <p className="text-gray-600">SAM: {op.sam}</p>
                          {op.repetitions && <p className="text-gray-600">Repeticiones: {op.repetitions}</p>}
                          {op.observations && <p className="text-gray-600">Observaciones: {op.observations}</p>}
                          {op.guideType && <p className="text-gray-600">Tipo de guía: {op.guideType}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListMultipleImport;
