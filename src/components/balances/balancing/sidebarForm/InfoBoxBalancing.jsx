// components/InfoBox.js
import { Button } from "@nextui-org/react";
import ModalDragOpers from "./ModalDragOpers.jsx";
import {useRecoilState} from "recoil";
import {allOpers, selectOpers} from "../../../../infraestructure/states/opers_states.js";
import React, {useEffect} from "react";
import ItemBoxBalancing from "./ItemBoxBalancing.jsx";
import {samSumOperation} from "../../../../infraestructure/states/operation_states.js";
import {balancingData} from "../../../../infraestructure/states/states_balancing.js";
import useModal from "./useModal.jsx";
import { currentUser } from "../../../../infraestructure/states/states_views.js";

const InfoBoxBalancing = () => {

  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)
  const [opers, setOpers] = useRecoilState(allOpers);
  const [samSum, setSamSum] = useRecoilState(samSumOperation);
  const [balancing, setBalancing] = useRecoilState(balancingData);

  const [user, setUser] = useRecoilState(currentUser);

  useEffect(() => {
    // const objetosFiltrados = opers.filter(objeto => opersSelect.has(objeto.id));
  

    const data = {
      minutesHour: opersSelect.size * 60,
      samSum: samSum,
      gol_hour: parseInt((opersSelect.size * 60) / samSum),
      gol_day: parseInt(((opersSelect.size * 60) / samSum) * 8)
    }
    setBalancing(data)
    
  }, [samSum,opersSelect]);

  return (
    <div>
      {
        user && (user.role === 'admin' || user.role === 'supervisor') && 
          <div className="hidden lg:block">
            <ModalDragOpers/>
          </div>
      }
      
      
      <div className="mt-3">
        {
            opersSelect.size >= 1 && balancing && (
              <>
                <ItemBoxBalancing
                  item={{
                    title: "Minutos disponibles",
                    description: balancing.minutesHour,
                  }}
                />
                <ItemBoxBalancing
                  item={{
                    title: "Sam total",
                    description: !isNaN(balancing.samSum) && parseFloat(balancing.samSum).toFixed(2),
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
    </div>
  );
};

export default InfoBoxBalancing;
