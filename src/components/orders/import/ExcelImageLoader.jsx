import React, { useState } from 'react';
import ExcelJS from 'exceljs';

import OperationListImport from "./OperationListImport.jsx";
import ImageListImport from "./ImageListImport.jsx";
import { FaEraser } from "react-icons/fa6";
import EraseButton from "../../../ui/CustomButton.jsx";
import ShowOderProdOperations from "./ShowOderProdOper.jsx";
import TitleDashboard from "../../../ui/TitleDashboard.jsx";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../infraestructure/data/toastMessage.js";

const ExcelImageLoader = ({ images, setImages, operationsData, setOperationsData, orderProOpe }) => {
  const handleFileUpload = async (file) => {
    if (!file) return;

    const workbook = new ExcelJS.Workbook();

    try {
      // Cargar el archivo Excel
      await workbook.xlsx.load(file);

      // Seleccionar la primera hoja
      const worksheet = workbook.getWorksheet(1);

      // Validación: Verificar si existe la hoja
      if (!worksheet) {
        toast.error(toastMessageCustom.error_invalid);
        return;
      }

      // Extraer imágenes y operaciones
      const extractedImages = extractImages(workbook);
      const extractedOperations = extractOperations(worksheet);

      // Validación: Verificar si hay operaciones
      if (extractedOperations.length === 0) {
        toast.error(toastMessageCustom.no_found);
        return;
      }

      // Validación: Advertir si no hay imágenes
      if (extractedImages.length === 0) {
        toast.error(toastMessageCustom.no_images);
      }

      // Actualizar estados
      setImages(extractedImages);
      setOperationsData(extractedOperations);

      toast.success(toastMessageCustom.file_upload)
    } catch (error) {
      toast.error(toastMessageCustom.error_upload);
      console.error(error);
    }
  };

  const extractImages = (workbook) => {
    const images = [];
    if (workbook.model && workbook.model.media) {
      workbook.model.media.forEach((media) => {
        if (media && media.type === 'image') {
          const base64String = `data:image/${media.extension};base64,${media.buffer.toString('base64')}`;
          images.push(base64String);
        }
      });
    }
    return images;
  };

  const extractOperations = (worksheet) => {
    const operations = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Saltar la fila de encabezado
        const operation = row.getCell(1).value;
        const machine = row.getCell(2).value;
        const sam = row.getCell(8).value;

        if (operation && machine && sam) { // Validar columnas requeridas
          operations.push({
            operation,
            machine,
            repetitions: row.getCell(3).value,
            observations: row.getCell(4).value,
            guideType: row.getCell(6).value,
            garment: row.getCell(7).value,
            sam,
            order: row.getCell(9).value,
          });
        }
      }
    });
    return operations;
  };

  // Drag and Drop Handlers
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const eraseData = () => {
    setImages([]);
    setOperationsData([]);
  };

  return (
    <div>
      {operationsData.length > 0 ? (
        <>
          {orderProOpe && (
            <>
              <ImageListImport images={images} />
              <ShowOderProdOperations orderProOpe={orderProOpe} />
            </>
          )}
        </>
      ) : (
        <>
          <div
            className="drop-container"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              border: '2px dashed #ccc',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <span className="drop-title">Arrastra el archivo de Excel aquí</span>
            <p>o</p>
            <input
              id="images"
              type="file"
              accept=".xlsx"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              style={{ display: 'none' }}
            />
            <label htmlFor="images" className="button">
              Seleccionar archivo
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default ExcelImageLoader;
