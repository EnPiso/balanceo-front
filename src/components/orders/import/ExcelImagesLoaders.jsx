import React, { useState, useEffect } from 'react';
import ExcelJS from 'exceljs';
import toast from 'react-hot-toast';
import { toastMessageCustom } from '../../../infraestructure/data/toastMessage.js';
import ListMultipleImport from './ListMultipleImport.jsx';
import { Badge, Chip } from '@nextui-org/react';
import { FaFileExcel } from 'react-icons/fa';
import { FaRegFileExcel } from 'react-icons/fa6';
import { RiFileExcel2Fill } from "react-icons/ri";
import { formatearString } from './utils.js';


const ExcelImagesLoaders = ({ fileMultiple, setFileMultiple, filesData, setFilesData, setProcessData, onAllFilesInvalid }) => {
  const [isProcessing, setIsProcessing] = useState(false);



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

  const validateHeaders = (worksheet) => {
    const headerRow = worksheet.getRow(1);
    if (!headerRow) return false;

    const expectedHeaders = {
      1: "operaci",
      2: "quina",
      8: "sam",
    };

    for (const [col, keyword] of Object.entries(expectedHeaders)) {
      const cellValue = headerRow.getCell(Number(col)).value;
      if (!cellValue || !String(cellValue).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(keyword)) {
        return false;
      }
    }

    return true;
  };


  const processFiles = async () => {
    if (!fileMultiple || fileMultiple.length === 0) return;

    setIsProcessing(true);
    const processedFiles = [];

    try {
      for (const file of fileMultiple) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);

        const worksheet = workbook.getWorksheet(1);

        if (!worksheet) {
          toast.error(`${file.name}: ${toastMessageCustom.error_invalid}`);
          continue;
        }

        if (!validateHeaders(worksheet)) {
          toast.error(`${file.name}: ${toastMessageCustom.invalid_columns}`);
          continue;
        }

        const extractedImages = extractImages(workbook);
        const { operations: extractedOperations, errors } = extractOperations(worksheet);

        if (extractedOperations.length === 0 && errors.length > 0) {
          toast.error(`${file.name}: ${toastMessageCustom.all_rows_invalid}`);
          continue;
        }

        if (extractedOperations.length === 0) {
          toast.error(`${file.name}: ${toastMessageCustom.no_found}`);
          continue;
        }

        if (errors.length > 0) {
          toast.error(`${file.name}: ${toastMessageCustom.invalid_rows}`);
        }

        processedFiles.push({
          images: extractedImages,
          operations: extractedOperations,
          fileName: file.name
        });
      }

      if (processedFiles.length > 0) {
        setFilesData(processedFiles);
        toast.success(toastMessageCustom.file_upload);
      } else {
        // Ningún archivo válido — resetear al drop zone
        if (onAllFilesInvalid) onAllFilesInvalid();
      }

    } catch (error) {
      toast.error(toastMessageCustom.error_upload);
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (fileMultiple && fileMultiple.length > 0) {
      processFiles();
    }
  }, [fileMultiple]);

  

  return (
    <div className="space-y-4">
      {isProcessing ? (
        <div className="text-center text-zinc-600">
          Procesando {fileMultiple.length} archivos...
        </div>
      ) : (
        <>
          {filesData.length > 0 && (
            <div className="space-y-4">
              <span className="flex justify-end items-center">
                <RiFileExcel2Fill color='green' size={30}/> 
                <span className='font-bold text-md text-green-800 text-right ml-1'>{filesData.length}</span>
              </span>
              <ListMultipleImport 
                setProcessData={setProcessData}
                productOperations={filesData}
              />
              
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExcelImagesLoaders;