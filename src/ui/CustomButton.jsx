// components/CustomButton.jsx
import React from 'react';
import { FaEraser } from "react-icons/fa6";
import {Button} from "@nextui-org/react";

const CustomButton = ({ color, variant, startContent, onClick, title }) => (
  <Button
    className="mx-1"
    color={color}
    variant={variant}
    startContent={startContent}
    onClick={onClick}>
    <span className="font-bold uppercase">
      {title}
    </span>
  </Button>
);

export default CustomButton