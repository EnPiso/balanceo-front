import {FaDeleteLeft} from "react-icons/fa6";
import React, {useState} from "react";
import {AiOutlineRight} from "react-icons/ai";
import {Avatar, Badge, Button, Input, Spinner} from "@nextui-org/react";
import {updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {assignColorsToArray} from "../../ui/utils.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";
import {nameImageDateNow} from "../../infraestructure/utils/imagesFormat.js";
import DeleteInputOperCustom from "./DeleteInputOperCustom.jsx";
import ImageLightbox from "../orders/import/ImageLightBox.jsx";
import {FaEdit} from "react-icons/fa";
import EditImageOperator from "./EditImageOperator.jsx";

const EditOperFormEdit = ({oper, opers, setOpers}) => {
  const [isEditName, setIsEditName] = useState(false)
  const [isEditIdOperator, setIsEditIdOperator] = useState(false)

  const [name, setName] = useState('')
  const [idOper, setIdOper] = useState('')

  const [isOpen, setIsOpen] = useState(false);

  const [isLoadName, setIsLoadName] = useState(false);

  const [isLoadIdOper, setIsLoadIdOper] = useState(false);

  const [operTempo, setOperTempo] = useState(null)

  // Función para abrir y cerrar el lightbox
  const toggleLightbox = () => setIsOpen(!isOpen);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {

      const data = {
        oper: {
          name: name
        }
      }
      
      fetchApiName(data, operTempo.id)
    }else if ((event.key === "Escape")){
      setIsEditName(false)
      setName('')
      setOperTempo(null)
    }
  };

  const handleKeyDownId = (event) => {

    if (event.key === "Enter") {
      const data = {
        oper: {
          id_oper: idOper
        }
      }
      // console.log(data, oper.id)
      fetchApi(data, operTempo.id)

    }else if ((event.key === "Escape")){
      setIsEditIdOperator(false)
      setIdOper('')
      setOperTempo(null)
    }
  };

  const handleName = (name, oper) => {
    setOperTempo(oper)
    setIsEditName(true)
    setName(name ? name : '')

  }

  const handleIdOper = (oper_id, oper) => {
    setOperTempo(oper)
    setIsEditIdOperator(true)
    setIdOper(oper_id ? oper_id : '')

  }


  const fetchApi = (data, id) => {
    setIsLoadIdOper(true)
    const updateSamOperation = async () => {
      try {
        const result = await updateData(urlMain + `opers/${id}`, data);
        const updatedItems = opers.map((item) =>
          item.id === result.id 
            ? { ...item, id_oper: result.id_oper } 
            : item
        );
        setOpers(updatedItems)
        setIsEditName(false)
        setIsEditIdOperator(false)
        setName("")
        setIdOper("")
        setOperTempo(null)
        toast.success("El operario ha sido actualizado con éxito")
      } catch (error) {
        console.error("Error setting data", error);
      } finally {
        setIsLoadIdOper(false)
      }
    };

    updateSamOperation();
  }

  const fetchApiName = (data, id) => {
    setIsLoadName(true)
    const updateName = async () => {
      try {
        const result = await updateData(urlMain + `opers/${id}/update_name`, data);
        const updatedItems = opers.map((item) =>
          item.id === result.id 
            ? { ...item, name: result.name } 
            : item
        );
        setOpers(updatedItems)
        setIsEditName(false)
        setIsEditIdOperator(false)
        setName("")
        setIdOper("")
        setOperTempo(null)
        toast.success("El operario ha sido actualizado con éxito")
      } catch (error) {
        console.error("Error setting data", error);
      } finally{
        setIsLoadName(false)
      }
    };

    updateName();
  }



  const url_image = (oper && oper.avatar) ?
    oper.avatar :
    "https://balance-assets.sfo3.digitaloceanspaces.com/assets/user.webp"

  return(
    <>
      <tr
        className="hover:bg-zinc-200 dark:hover:bg-zinc-700 ">
        <td  className="p-3  text-zinc-800 ">
            <span className="flex justify-between items-center">

              {
                isLoadName ? (
                  <>
                    <Spinner color="default" size={"lg"}/>
                  </>
                ) : (
                  <>
                  {
                        isEditName ? (
                            <Input
                              onKeyDown={handleKeyDown}
                              endContent={<AiOutlineRight/>}
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                              type="text"/>
                          ) : <span onClick={()=> handleName(oper.name, oper)}  className="cursor-pointer">{oper.name}</span>
                        }

                        <EditImageOperator
                          url_image={url_image}
                          toggleLightbox={toggleLightbox}
                          oper={oper}
                          opers={opers}
                          setOpers={setOpers}
                          setIsOpen={setIsOpen}
                        />
                  </>
                )
              }

            </span>
        </td>
        <td className="p-5  text-zinc-800 flex justify-between items-center">
          <span>

              {
                isLoadIdOper ? <Spinner color="default" size={"lg"}/> : (
                  <>
                    {
                      isEditIdOperator ? (
                        <Input
                          onKeyDown={handleKeyDownId}
                          endContent={<AiOutlineRight/>}
                          onChange={(e) => setIdOper(e.target.value)}
                          value={idOper}
                          type="text"/>
                      ) :
                        <span onClick={()=> handleIdOper(oper.id_oper, oper)} className="cursor-pointer ">
                          {oper.id_oper ? oper.id_oper : 'Click para editar la cédula'}
                        </span>
                    }
                  </>
                )
              }

            
          </span>

          <DeleteInputOperCustom
            oper={oper}
            opers={opers}
            setOpers={setOpers}
          />

        </td>
      </tr>

      {/* Lightbox */}
      {isOpen && (
        <span className="lightbox" onClick={toggleLightbox}>
            <span
              className="lightbox-content"
              style={{ backgroundImage: `url(${url_image})` }}
            />
        </span>
      )}
    </>
  )
}

export default EditOperFormEdit;