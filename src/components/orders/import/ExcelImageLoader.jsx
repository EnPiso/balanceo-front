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
import { formatearString } from './utils.js';

const ExcelImageLoader = ({ images, setImages, operationsData, setOperationsData, orderProOpe, handleMultipleFile }) => {

  const [importErrors, setImportErrors] = useState([]);

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

      // Validación: Verificar que los encabezados coincidan con el formato esperado
      if (!validateHeaders(worksheet)) {
        toast.error(toastMessageCustom.invalid_columns);
        return;
      }

      // Extraer imágenes y operaciones
      const extractedImages = extractImages(workbook);
      const { operations: extractedOperations, errors } = extractOperations(worksheet);

      // Si todas las filas son inválidas
      if (extractedOperations.length === 0 && errors.length > 0) {
        toast.error(toastMessageCustom.all_rows_invalid);
        setImportErrors(errors);
        return;
      }

      // Validación: Verificar si hay operaciones
      if (extractedOperations.length === 0) {
        toast.error(toastMessageCustom.no_found);
        return;
      }

      // Si hay filas descartadas, advertir
      if (errors.length > 0) {
        toast.error(toastMessageCustom.invalid_rows);
        setImportErrors(errors);
      } else {
        setImportErrors([]);
      }

      // Imagen es opcional, no mostrar error

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

  const validateHeaders = (worksheet) => {
    const headerRow = worksheet.getRow(1);
    if (!headerRow) return false;

    // Mapeo: columna → palabra clave que debe contener el encabezado
    const expectedHeaders = {
      1: "operaci",    // DESCRIPCIÓN DE LA OPERACIÓN
      2: "quina",      // MÁQUINA
      8: "sam",        // SAM
    };

    for (const [col, keyword] of Object.entries(expectedHeaders)) {
      const cellValue = headerRow.getCell(Number(col)).value;
      if (!cellValue || !String(cellValue).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(keyword)) {
        return false;
      }
    }

    return true;
  };

  const extractOperations = (worksheet) => {
    const operations = [];
    const errors = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Saltar encabezado
        const firstCell = row.getCell(1).value;
        const machine_name = row.getCell(2).value;
        const sam = row.getCell(8).value;
        const garmentName = row.getCell(7).value;
        const reference = row.getCell(10).value;
        const category = row.getCell(11).value;

        // Campos obligatorios: operación, máquina, SAM
        const rowErrors = [];

        if (typeof firstCell !== "string" || firstCell.trim().length === 0) {
          rowErrors.push("operación");
        }
        if (typeof machine_name !== "string" || machine_name.trim().length === 0) {
          rowErrors.push("máquina");
        }
        if (typeof sam !== "number" || sam <= 0) {
          rowErrors.push("SAM");
        }

        if (rowErrors.length > 0) {
          errors.push({ row: rowNumber, fields: rowErrors });
          return;
        }

        const stringFormat = formatearString(firstCell);
        const garment = garmentName ? String(garmentName).trim() : "";
        const ref = reference ? String(reference).trim() : "";
        const cat = category ? String(category).trim() : "";

        operations.push({
          operation: stringFormat,
          machine_name,
          repetitions: row.getCell(3).value,
          observations: row.getCell(4).value,
          needleType: row.getCell(5).value,
          guideType: row.getCell(6).value,
          garment: `${garment} [${ref}] {${cat}}`,
          sam,
          order: row.getCell(9).value,
          reference: ref
        });
      }
    });

    return { operations, errors };
  };


  // Drag and Drop Handlers
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files;

    if (file.length > 1) {
      handleMultipleFile(event.dataTransfer.files); // Manejar múltiples archivos
    } else {
      handleFileUpload(file[0]);
    }

  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const eraseData = () => {
    setImages([]);
    setOperationsData([]);
    setImportErrors([]);
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;

    if (files.length > 1) {
      handleMultipleFile(files); // Manejar múltiples archivos
    } else {
      handleFileUpload(files[0]); // Manejar un solo archivo
    }
  };

  return (
    <div>
      {operationsData.length > 0 ? (
        <>
          {importErrors.length > 0 && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-600 rounded-lg">
              <p className="text-amber-800 dark:text-amber-200 font-semibold text-sm mb-2">
                {importErrors.length} fila(s) descartadas por datos incompletos:
              </p>
              <ul className="list-disc list-inside text-amber-700 dark:text-amber-300 text-xs max-h-32 overflow-y-auto">
                {importErrors.map((err, i) => (
                  <li key={i}>Fila {err.row}: falta {err.fields.join(", ")}</li>
                ))}
              </ul>
            </div>
          )}
          {orderProOpe && (
            <>
              <ImageListImport images={images} />
              <ShowOderProdOperations orderProOpe={orderProOpe} />
            </>
          )}
        </>
      ) : (
        <>
          {importErrors.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-600 rounded-lg">
              <p className="text-red-800 dark:text-red-200 font-semibold text-sm mb-2">
                Ninguna fila es válida. {importErrors.length} fila(s) con errores:
              </p>
              <ul className="list-disc list-inside text-red-700 dark:text-red-300 text-xs max-h-32 overflow-y-auto">
                {importErrors.map((err, i) => (
                  <li key={i}>Fila {err.row}: falta {err.fields.join(", ")}</li>
                ))}
              </ul>
            </div>
          )}
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
              multiple
              id="images"
              type="file"
              accept=".xlsx"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="images" className="button w-full font-black text-zinc-700 underline hover:text-zinc-500 cursor-pointer">
              Seleccionar archivo
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default ExcelImageLoader;
