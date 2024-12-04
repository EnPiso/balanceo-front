import React, { useEffect, useState } from "react";
import { updateData } from "../../../../infraestructure/call_api/crud.js";
import { urlMain } from "../../../../infraestructure/data/const.js";
import { useRecoilState } from "recoil";
import { allOperationsProduct } from "../../../../infraestructure/states/operation_states.js";
import PolyvalenceOperation from "./PolyvalenceOperation.jsx";
import { checkOpersPosition } from "../../../../infraestructure/states/opers_states.js";
import PolyOperOperation from "./PolyOperOperation.jsx";
import { detailOperOperations } from "../../../../infraestructure/states/states_balancing.js";
import {FaFileVideo, FaPlay, FaVideo} from "react-icons/fa6";
import {
  checkOperationsBalancing,
  listVideosOperations,
  listVideosOpers
} from "../../../../infraestructure/states/states_videos.js";
import TrDinamycVideo from "./videoOperations/TrDinamycVideo.jsx";
import ButtonPlayVideos from "./videoOperations/ButtonPlayVideos.jsx";
import ButtonNavigationVideos from "./videoOperations/ButtonNavigationVideos.jsx";

const TableRowOperations = ({
                              item,
                              opersSelect,
                              balancing,
                              operatorTimes,
                              draggable = false,
                              onDragStart,
                              onDragOver,
                              onDrop,
                              onDragEnd,
                              className = "",
                              setIsModalInput,
                              showVideos,
                              setShowVideos
                            }) => {
  const sam_seg = parseInt(item.sam * 60);

  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct);
  const [selectedOperDetails] = useRecoilState(checkOpersPosition);
  const [detailOperOpera] = useRecoilState(detailOperOperations);

  const [selOpeVideos, setSelOpeVideos] = useRecoilState(checkOperationsBalancing);

  const [videosOperations, setVideosOperations] = useRecoilState(listVideosOperations)
  const [OpersTags, setOpersTags] = useRecoilState(listVideosOpers)



  useEffect(() => {
    // Aquí puedes agregar lógica adicional dependiente de operatorTimes
  }, [operatorTimes]);

  const handleSam = (item, value) => {
    const data = {
      operationBalancing: {
        item: item,
        value: value,
      },
    };

    const postDataOrder = async (data) => {
      try {
        const result = await updateData(urlMain + "/balancings/is_sam_minutes", data);

        const id = result.id;

        const updatedItems = operationsProduct.map((item) => ({ ...item })); // Copia profunda
        updatedItems.forEach((item) => {
          if (item.id === id) {
            item.is_sam_minutes = result.is_sam_minutes;
          }
        });
        setOperationsProduct(updatedItems);
      } catch (error) {
        console.error("Error setting data", error);
      }
    };

    postDataOrder(data);
  };

  const handleOperationBalancing = (item) => {
    setSelOpeVideos(item)
    setShowVideos(item)
    setIsModalInput(true)
  }


  return (
    <>
      <tr
        // draggable={draggable}
        // onDragStart={onDragStart}
        // onDragOver={onDragOver}
        // onDrop={onDrop}
        // onDragEnd={onDragEnd}
        className={` cursor-move  hover:border-zinc-600 dark:hover:border-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition dark:text-zinc-500
         {/* item.is_repeat ? 'border-double border-1 border-zinc-500 ' : 'border-l-4 border-transparent' */}
         
         `}
        style={{
          background: item.is_repeat ? `linear-gradient(to right, ${item.color[0]}, ${item.color[1]}), rgba(0, 0, 0, 0.06)` : item.color,
          backgroundBlendMode: item.is_repeat ? "multiply" : "normal", // Mezcla el degradado con el color oscuro
        }}
      >

        <td className={`px-4 py-2 border border-gray-300 ${showVideos && showVideos.id === item.id && 'font-bold'}`}>
          <small>
            <span className="font-bold">
              {item.operation_position}
            </span>
          </small>  {item.operation}
          <div className="flex justify-end">



            <ButtonPlayVideos
              item={item}
              showVideos={showVideos}
              setShowVideos={setShowVideos}
            />

            <button onClick={()=> handleOperationBalancing(item)}>
              <FaFileVideo/>
            </button>
          </div>

        </td>
        <td className="px-4 py-2 border border-gray-300">{item.machine}</td>
        <td
          onClick={() => handleSam(item, true)}
          className={`px-4 py-2 border border-gray-300 cursor-pointer ${item.is_sam_minutes && "font-bold"}`}
        >
          {item.sam}


        </td>
        <td
          onClick={() => handleSam(item, false)}
          className={`px-4 py-2 border border-gray-300 cursor-pointer ${!item.is_sam_minutes && "font-bold"}`}
        >
          {sam_seg}
        </td>

        {opersSelect.size >= 1 && balancing && (
          <>
            <td className="px-4 py-2 border border-gray-300">
              {(item.sam * balancing.gol_hour).toFixed(2)}
            </td>
            {[...opersSelect].map((operatorId, index) => {
              // Busca el detalle correspondiente en `detailOperOpera`
              const operatorDetail = detailOperOpera?.find(
                (detail) =>
                  detail.oper_id === operatorId && // Coincidencia con `opers_balancing_id`
                  detail.detail.operations_balancing_id === item.operation_balancing_id // Coincidencia con `operations_balancing_id`
              );

              // Extrae `polyvalence`, o usa un valor predeterminado si no existe
              const polyvalence = operatorDetail?.detail?.polyvalence || 100;

              const color = operatorDetail?.detail?.color || "";


              return (
                <>

                  <PolyOperOperation
                    key={`poly-oper-${index}`}
                    selectedOperDetails={selectedOperDetails}
                    operatorTimes={operatorTimes}
                    item={item}
                    i={index}
                    polyvalenceDetail={polyvalence}
                    color={color}
                  />
                </>
              );
            })}

          </>
        )}


      </tr>
      {
        showVideos && item && (showVideos.id === item.id) && (
          <>
            <TrDinamycVideo showVideos={showVideos}/>
          </>
        )
      }
      {
        videosOperations.length >= 1 && OpersTags.length >= 1 && <ButtonNavigationVideos/>
      }

    </>
  );
};

export default TableRowOperations;
