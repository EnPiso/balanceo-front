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


const ExcelImagesLoaders = ({ fileMultiple, setFileMultiple, filesData, setFilesData, setProcessData }) => {
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

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Saltar encabezado
        const firstCell = row.getCell(1).value;
        const machine_name = row.getCell(2).value;
        const sam = row.getCell(8).value;

        // Validar que sea una fila de operación real
        const isValidRow =
          typeof firstCell === "string" &&
          firstCell.trim().length > 0 &&
          typeof machine_name === "string" &&
          machine_name.trim().length > 0 &&
          typeof sam === "number";

        if (!isValidRow) return;

        const stringFormat = formatearString(firstCell);

        operations.push({
          operation: stringFormat,
          machine_name,
          repetitions: row.getCell(3).value,
          observations: row.getCell(4).value,
          needleType: row.getCell(5).value,
          guideType: row.getCell(6).value,
          garment: `${row.getCell(7).value} [${row.getCell(10).value}] {${row.getCell(11).value}}`,
          sam,
          order: row.getCell(9).value,
          reference: row.getCell(10).value
        });
      }
    });

    return operations;
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

        const extractedImages = extractImages(workbook);
        const extractedOperations = extractOperations(worksheet);

        if (extractedOperations.length === 0) {
          toast.error(`${file.name}: ${toastMessageCustom.no_found}`);
          continue;
        }

        if (extractedImages.length === 0) {
          toast.error(`${file.name}: ${toastMessageCustom.no_images}`);
        }

        // Agregar el objeto con la estructura requerida
        processedFiles.push({
          images: extractedImages,
          operations: extractedOperations,
          fileName: file.name  // Opcional: por si necesitas el nombre del archivo
        });
      }

      if (processedFiles.length > 0) {
        setFilesData(processedFiles);
        toast.success(toastMessageCustom.file_upload);
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