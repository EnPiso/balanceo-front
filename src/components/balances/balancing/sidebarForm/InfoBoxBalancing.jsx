// components/InfoBox.js
import { Button } from "@nextui-org/react";
import ModalDragOpers from "./ModalDragOpers.jsx";
import {useRecoilState} from "recoil";
import {allOpers, selectOpers} from "../../../../infraestructure/states/opers_states.js";
import React, {useEffect} from "react";
import ItemBoxBalancing from "./ItemBoxBalancing.jsx";
import {samSumOperation} from "../../../../infraestructure/states/operation_states.js";
import {balancingData} from "../../../../infraestructure/states/states_balancing.js";

const InfoBoxBalancing = () => {

  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)
  const [opers, setOpers] = useRecoilState(allOpers);
  const [samSum, setSamSum] = useRecoilState(samSumOperation);
  const [balancing, setBalancing] = useRecoilState(balancingData);


  useEffect(() => {
    // const objetosFiltrados = opers.filter(objeto => opersSelect.has(objeto.id));
    // console.log(objetosFiltrados)

    const data = {
      minutesHour: opersSelect.size * 60,
      samSum: samSum,
      gol_hour: parseInt((opersSelect.size * 60) / samSum),
      gol_day: parseInt(((opersSelect.size * 60) / samSum) * 8)
    }
    setBalancing(data)
  }, [samSum,opersSelect]);

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg shadow-md max-w-md  space-y-3 mt-4">

      <ModalDragOpers/>

      {
        opersSelect.size >= 1 && balancing && (
          <>
            <ItemBoxBalancing
              item={{
                title: "Minutos disponibles x hora",
                description: balancing.minutesHour,
              }}
            />
            <ItemBoxBalancing
              item={{
                title: "Sam total",
                description: balancing.samSum,
              }}
            />
            <ItemBoxBalancing
              item={{
                title: "Meta por hora",
                description: balancing.gol_hour,
              }}
            />
            <ItemBoxBalancing
              item={{
                title: "Meta al día al 100%",
                description: balancing.gol_day,
              }}
            />

          </>
        )
      }


    </div>
  );
};

export default InfoBoxBalancing;
