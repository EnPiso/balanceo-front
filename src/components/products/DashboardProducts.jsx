import {Button} from "@nextui-org/react";
import {FaFileExcel} from "react-icons/fa6";
import React, {useState} from "react";
import {AiTwotoneFolderOpen} from "react-icons/ai";
import ModalProducts from "./ModalProducts.jsx";
 const DashboardProducts = () => {

     const [isOpen, setIsOpen] = useState(false);


     const handleClose = () => setIsOpen(false);
     const handleOpen = () => setIsOpen(true);
     return (
        <div className="flex flex-col gap-2">
            <Button
                onClick={handleOpen}
                startContent={<AiTwotoneFolderOpen/>}
                size="5xl"
                className="w-full dark:bg-zinc-900 h-10 font-bold "
                variant="bordered">
               Productos
            </Button>
            {
                isOpen && <ModalProducts
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                />
            }


        </div>
    )
}

export default DashboardProducts;