import {Avatar, Badge, Button, Spinner} from "@nextui-org/react";
import {FaBackward, FaEdit} from "react-icons/fa";
import React, {useState} from "react";
import {updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import toast from "react-hot-toast";

const EditImageOperator = ({url_image, toggleLightbox,oper, opers, setOpers,setIsOpen}) => {
  const [isEdit,setIsEdit] = useState(false)
  const [isLoad,setIsLoad] = useState(false)


  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

  const handleImage = (e, oper) => {
    const value = e.target.files[0]

    console.log(e, oper)

    if (value) {
      const data = new FormData();
      data.append("oper[avatar]", value);
      const id = oper.id

      const updateAvatar = async () => {
        try {
          const result = await updateData(urlMain + `opers/${id}/purge_update_img`, data);
          console.log(result)
          const updatedItems = opers.map((item) =>
            item.id === id ? result : item
          );
          debugger
          setOpers(updatedItems)
          setIsEdit(false)
          setIsOpen(true)

          toast.success("La imagen del operario ha sido actualizado con éxito")
        } catch (error) {
          console.error("Error setting data", error);
        } finally {
          setIsLoad(false)
        }
      };

      updateAvatar();


    }


  }

  return(
    <>
      <span>
      {
        isEdit ?
          <>
            {
              isLoad ?
                <Spinner size={23} color={"default"}/> :
                (
                  <>
                    <input
                      id="images"
                      type="file"
                      // accept=".xlsx"
                      onChange={(e) => handleImage(e, oper)}
                      style={{display: 'none'}}
                    />
                    <label htmlFor="images"
                           className="button w-full font-black text-zinc-700 underline hover:text-zinc-500 cursor-pointer flex justify-between items-center">
                      Seleccionar archivo <FaBackward color={"red"} className={"ml-2"} onClick={() => setIsEdit(false)}/>
                    </label>
                  </>
                )
            }

          </> :
          <Badge content={<FaEdit color={"green"} onClick={handleEdit}/>} shape="circle">
            <Button isIconOnly aria-label="more than 99 notifications" radius="full" variant="light">
              <Avatar
                src={url_image}
                onClick={toggleLightbox}
                style={{cursor: 'pointer'}}
              />
            </Button>
          </Badge>
      }
      </span>
    </>
  )
}

export default EditImageOperator;