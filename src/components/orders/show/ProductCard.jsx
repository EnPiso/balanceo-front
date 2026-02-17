import React from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import OperationList from './OperationList';

const ProductCard = ({ product }) => {
  return (
    <Card className="border rounded-lg shadow-sm p-4">
      <CardHeader className="pb-2">
        <h4 className="text-lg font-medium">{product.product.name}</h4>
      </CardHeader>
      <CardBody className="space-y-2">
        <OperationList operations={product.operations} />
      </CardBody>
    </Card>
  );
};

export default ProductCard;