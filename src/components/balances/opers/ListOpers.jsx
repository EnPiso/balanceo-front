    import React, {useEffect, useState} from "react";
import useOpers from "../../../hooks/balances/opers/useOpers.jsx";
import TitleDashboard from "../../../ui/TitleDashboard.jsx";
import { FaCheck } from "react-icons/fa";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar } from "@nextui-org/react";
import useSelectableRows from "../../../hooks/balances/opers/useSelectableRows.jsx";
import { useRecoilState } from "recoil";
import {
  checkOpersPosition, isNewModule,
  selectOpers,
  selectProdPlant,
  selectProdPlantOriginal
} from "../../../infraestructure/states/opers_states.js";
import {ConfirmOpen} from "../balancing/sidebarForm/ConfirmOpers.jsx";
import { userAvatarImage } from "../../../infraestructure/data/links.js";

export const ListOpers = ({ updateSelectedOperDetails,handleSave,onClose }) => {

  const opers = useOpers();



  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers);
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección



  const { selectedItems, handleRowSelection } = useSelectableRows(opersSelect);

  const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)
  const [prodPlant, setProdPlant] = useRecoilState(selectProdPlant)

  const [isOpen, setIsOpen] = useState(false)

  const [isOpenImage, setIsOpenImage] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const [isNewInModule, setIsNewInModule] = useState(null)

  const [isNewInModuleTempo, setIsNewInModuleTempo] = useRecoilState(isNewModule)


  useEffect(() => {
    const opersSelectArray = Array.from(opersSelect);
    const selectedItemsArray = Array.from(selectedItems);

    if (
      opersSelectArray.length !== selectedItemsArray.length ||
      !opersSelectArray.every((id) => selectedItems.has(id))
    ) {
      setOpersSelect(new Set(selectedItems));
    }
  }, [selectedItems, opersSelect, setOpersSelect]);


  const handleClick = (oper) => {
    // Verifica si ambos estados están vacíos
    const isEmptyState = opersSelect.size === 0 && selectedOperDetails.length === 0;

    // Verifica si se selecciona desde otro módulo
    const isSameModule = prodPlantOriginal && prodPlant.module.id === prodPlantOriginal.module.id;
    const isNewSelectionAllowed = prodPlantOriginal === null || isEmptyState;

    if (isSameModule || isNewSelectionAllowed) {
      // Permitir selección normal
      handleRowSelection(oper.id);
      updateSelectedOperDetails(oper, !selectedItems.has(oper.id));
    } else {
      // Mostrar confirmación para cambiar de módulo
      setIsOpen(true);
    }
  };

  useEffect(() => {
    // Cuando no haya seleccionados, permitir cambiar de módulo
    if (opersSelect.size === 0 && selectedOperDetails.length === 0) {
      setProdPlantOriginal(null); // Permitir seleccionar un nuevo módulo
    }
  }, [opersSelect, selectedOperDetails]);


  const handleConfirmChange = () => {
    setIsOpen(false); // Cerrar el modal de confirmación
  };

  const toggleLightbox = () =>{
     setIsOpenImage(!isOpenImage)
     setImageUrl('')
    
  };

  const urlImage = (oper) => {
    const url_image = (oper && oper.avatar) ?
    oper.avatar :
    userAvatarImage

    return url_image
  }


  
  const urlImageFormat = (oper) => {
    const url_image = (oper && oper.avatar) ?
    oper.avatar :
    userAvatarImage

    setIsOpenImage(true)
    setImageUrl(url_image)

  }
   

  return (
    <div className="select-none">
      <TitleDashboard />
      <Table aria-label="Tabla de operaciones">
        <TableHeader>
          <TableColumn className="select-none">NOMBRE</TableColumn>
        </TableHeader>
        <TableBody>
          {opers.map((oper) => (
            <TableRow
              key={oper.id}
              onClick={() => handleClick(oper)}
              className={`uppercase cursor-pointer select-none ${selectedItems.has(oper.id) ? "bg-zinc-300 text-zinc-800 font-bold " : ""}`}
            >
              <TableCell className="flex justify-between items-center select-none">
                {selectedItems.has(oper.id) && <FaCheck className="text-zinc-700" />}
                
                {oper.name} <Avatar src={urlImage(oper)} onMouseEnter={()=>  oper.avatar && urlImageFormat(oper)}/> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmOpen
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleSave={handleConfirmChange} // Limpia y permite seleccionar del nuevo módulo
          title={`Actualmente los operarios seleccionados pertenecen al módulo`}
          description={`${prodPlantOriginal && prodPlantOriginal.module.name} debes quitarlos y luego puedes seleccionar operarios el nuevo módulo`}
      />

        {/* Lightbox */}
        {isOpenImage && (
        <span className="lightbox" onClick={toggleLightbox}>
            <span
              className="lightbox-content"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
        </span>
      )}
    </div>
  );
};

export default ListOpers;
