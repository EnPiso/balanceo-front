import React from 'react';

const OperationList = ({ operations }) => {
  return (
    <div className="space-y-4">
      <h5 className="font-semibold text-sm text-gray-600">Operations</h5>
      {operations.map((operationData, index) => (
        <div key={index} className="p-2 border rounded-md bg-gray-100">
          <p className="text-sm font-medium">Operation: {operationData.operation.operation}</p>
          <p className="text-sm text-gray-700">Machine: {operationData.operation.machine}</p>
          <p className="text-sm text-gray-700">SAM: {operationData.operation.sam}</p>
        </div>
      ))}
    </div>
  );
};

export default OperationList;
