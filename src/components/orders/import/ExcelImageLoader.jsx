import React, { useState } from 'react';
import ExcelJS from 'exceljs';

import OperationListImport from "./OperationListImport.jsx";
import ImageListImport from "./ImageListImport.jsx";
import {FaEraser} from "react-icons/fa6";
import EraseButton from "../../../ui/CustomButton.jsx";
import ShowOderProdOperations from "./ShowOderProdOper.jsx";
import TitleDashboard from "../../../ui/TitleDashboard.jsx";

const ExcelImageLoader = ({images,setImages,operationsData, setOperationsData, orderProOpe}) => {


  const handleFileUpload = async (file) => {
    if (!file) return;

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    const worksheet = workbook.getWorksheet(1);
    const extractedImages = extractImages(workbook);
    const extractedOperations = extractOperations(worksheet);

    setImages(extractedImages);
    setOperationsData(extractedOperations);
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
      if (rowNumber > 1) {
        if(row.getCell(1).value){
          operations.push({
            operation: row.getCell(1).value,
            machine: row.getCell(2).value,
            repetitions: row.getCell(3).value,
            observations: row.getCell(4).value,
            guideType: row.getCell(6).value,
            garment: row.getCell(7).value,
            sam: row.getCell(8).value,
            order: row.getCell(9).value
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
    setImages([])
    setOperationsData([])
  }

  return (
    <div>

      {
        operationsData.length > 0 ? (
          <>



            {
              orderProOpe && (
                <>
                  <ImageListImport images={images} />
                  <ShowOderProdOperations orderProOpe={orderProOpe}/>
                </>
              )
            }


          </>
        ): (
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
              <span className="drop-title">Arrastra el archivo de excel aquí</span>
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
        )
      }

    </div>
  );
};

export default ExcelImageLoader;