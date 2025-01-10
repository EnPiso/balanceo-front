import React, {useEffect, useState} from "react";
import FormCategoryProduct from "./FormCategoryProduct.jsx";
import { FaPlusCircle } from "react-icons/fa";
import {useRecoilState} from "recoil";
import {categoriesAll, categoriesAllCustom} from "../../infraestructure/states/states_product.js";
import {fetchGetData, updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {FaDeleteLeft} from "react-icons/fa6";
import InputTextEdit from "./InputTextEdit.jsx";
import EditCategoryCrud from "./EditCategoryCrud.jsx";
import CustomPaginator from "../../ui/CustomPaginator.jsx";
import ConfirmArchive from "../orders/orderList/ConfirmArchive.jsx";
import toast from "react-hot-toast";

const totalPaginate = [8,20,30,40,50]

const ListCategoryProducts = () => {
  const [isNew, setIsNew] = useState(false);
  const [categories, setCategories] = useRecoilState(categoriesAllCustom);
  const [isLoad, setIsLoad] = useState(false)

  const [ isEdit,setIsEdit] = useState(false)

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(8); // Total de páginas

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [categoryUpdate, setCategoryUpdate] = useState(null);


  const fetchCategories = async (currentPage, perPage) => {
    setIsLoad(true);
    try {
      const result = await fetchGetData(`${urlMain}category_products/index_custom?page=${currentPage}&per_page=${perPage}`);
      setCategories(result.category_products);
      setTotalPages(result.total_pages);
      setCurrentPage(result.current_page);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoad(false);
    }
  };


  useEffect(() => {
      fetchCategories(currentPage, perPage)
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCategories(page, perPage);
  };

  const handleTotalChange = (page) => {

    setPerPage(page)
    fetchCategories(1,page);
  };


  const handleDelete = (category) => {
    setCategoryUpdate(category)
    setIsOpenConfirm(true)
  }


  const fetchApi = () => {
    const id = categoryUpdate.id
    const data = {
      category_product: {
        active: false,
        name: `${categoryUpdate.name} [${categoryUpdate.id}]`
      }
    }

    const updateCategory = async () => {
      try {
        const result = await updateData(urlMain + `category_products/${id}`, data)

        const updatedItems = categories.filter(item => item.id !== result.id);
        setCategories(updatedItems)
        toast("La categoría ha sido removida correctamente")
        setIsOpenConfirm(false)
        // guardar imagen de la tabla del balanceo en product
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    updateCategory()
  }

  return (
    <>
      <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
        <thead>
        <tr className="dark:bg-gray-100 bg-zinc-200 text-zinc-100 dark:text-zinc-800 sticky top-0 ">
          <th className="p-4 font-medium border border-gray-300 flex justify-between items-center text-zinc-800">
            <span>Nombre</span>
            {
              !isNew ? ( // Si no está creando, muestra el ícono
                <span className={"flex justify-between items-center"}>
                   <span className="flex space-x-2">

                    {
                      totalPaginate.map((page, i) => {
                        return (
                          <>
                                <span
                                  onClick={() => handleTotalChange(page)}
                                  className={`cursor-pointer ${perPage === page && 'text-green-600'}`}
                                  key={i}>
                                  {page}
                                </span>
                          </>
                        )
                      })
                    }

                  </span>

                  <span onClick={() => setIsNew(true)} className="cursor-pointer ml-3">
                    <FaPlusCircle color={"green"} size={23}/>
                  </span>

                </span>
              ) : ( // Si está creando, muestra el formulario
                <FormCategoryProduct setIsNew={setIsNew}/>
              )
            }
          </th>
        </tr>
        </thead>
        <tbody>
        {
          categories.map((category, i) => {
            return (
              <>
                <tr key={i}>
                  <td className={"p-3 border border-gray-300 cursor-pointer flex justify-between items-center"}>
                    <EditCategoryCrud category={category}/>
                    <span className={"cursor-pointer"} onClick={()=> handleDelete(category)}>
                      <FaDeleteLeft color={"red"} size={23}/>
                    </span>
                  </td>
                </tr>
              </>
            )
          })
        }
        </tbody>
      </table>

      <div className="flex justify-start py-4">
        <CustomPaginator
          total={totalPages}
          initialPage={currentPage}
          onChange={handlePageChange}
        />
      </div>

      <ConfirmArchive
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        handleSubmit={fetchApi}
        title={`¿ Quieres eliminar`}
        description={`${categoryUpdate && categoryUpdate.name} de la lista?`}
        isLoading={isLoading}
      />

    </>
  );
};

export default ListCategoryProducts;
