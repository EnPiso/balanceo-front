import React, { useEffect, useState } from 'react';
import { fetchGetData } from '../../../infraestructure/call_api/crud';
import { urlMain } from '../../../infraestructure/data/const';
import ObjManualProduct from './ObjManualProduct';
import { FaRightLong } from 'react-icons/fa6';
import CustomPaginator from '../../../ui/CustomPaginator';
import MyCustomButton from '../../../ui/MyCustomButton';
import { useRecoilState } from 'recoil';
import { isShowCreateProdBal } from '../../../infraestructure/states/states_manual_order';

const totalPaginate = [10, 20, 30, 40, 50];

const ListManualOrderSelect = ({ dataSearchList, setIsOpenManualModal, newManual }) => {
  //newManual.products.length >= 1
  const [products,setProducts] = useState([])

  

  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(10); // Total de páginas
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isShowCreate, setIsShowCreate] = useRecoilState(isShowCreateProdBal);
  

  useEffect(() => {
    fetchApiProducts(currentPage,perPage)
  }, [dataSearchList]);

 


  const fetchApiProducts = (currentPage, perPage) => {
    const getData = async () => {
      try {
        const formattedDate = dataSearchList && dataSearchList.created_at ? dataSearchList.created_at.toString() : '';

        const queryParamsObject = {
          ...(dataSearchList && !dataSearchList.original && dataSearchList.module && { 'q[plant_module_name_cont]': dataSearchList.module }),
          ...(dataSearchList && dataSearchList.name && { 'q[name_cont]': dataSearchList.name }), // name_cont busca en name y reference
          ...(dataSearchList && dataSearchList.reference && { 'q[reference_cont]': dataSearchList.reference }),
          ...(dataSearchList && !dataSearchList.original && dataSearchList.created_at && { 'q[created_at_eq]': encodeURIComponent(formattedDate) }),
          ...(dataSearchList && dataSearchList.original
            ? { 'q[original_eq]': true }
            : { 'q[has_opers_balancing_eq]': true, 'q[original_eq]': false }),
          page: currentPage,
          per_page: perPage,
        };

        const queryParams = new URLSearchParams(queryParamsObject);

        const result = await fetchGetData(`${urlMain}products/index_manual_order?${queryParams.toString()}`);

        setProducts(result.products);
        setTotalPages(result.total_pages);
        setCurrentPage(result.current_page);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    getData();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchApiProducts(page, perPage);
  };

  const handlePerPageChange = (page) => {
    setPerPage(page);
    fetchApiProducts(1, page);
  };

  return <div>
    <span className="flex justify-end m-2 space-x-2">
      {totalPaginate.map((page, i) => (
          <span
            onClick={() => handlePerPageChange(page)}
            className={`cursor-pointer font-bold ${perPage === page && 'text-secondary_two'}`}
            key={i}
          >
            {page}
          </span>
      ))}
    </span>
    <table className="min-w-full border border-gray-300 dark:border-gray-600 mt-2">
                {/* Encabezados */}
      {
        products.length >= 1 && (
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
            <tr>
              <th className="px-4 py-2 border text-left border-gray-300 dark:border-gray-600 flex justify-between items-center">
                Producto  <span className="text-secondary_two">Referencia</span> 
              </th>
              {
                dataSearchList && !dataSearchList.original && (
                  <>
                    <th className="px-4 py-2 border text-left border-gray-300 dark:border-gray-600 text-secondary_two">
                      Módulo
                    </th>
                    <th className="px-4 py-2 border text-left border-gray-300 dark:border-gray-600 text-secondary_two">
                      Creación
                    </th>
                  </>
                )
              }
              <th className="px-4 py-2 border text-left border-gray-300 dark:border-gray-600 text-secondary_two">
                
              </th>
            </tr>
          </thead>  
        )
      }
                
                
      
      <tbody>
      
          {
            products.map((product, i)=> {
              return(
                <ObjManualProduct 
                  dataSearchList={dataSearchList}
                  product={product} 
                  key={i}/>
              )
            })
          }
        

        
          
      </tbody>
    </table>
    <div className="flex justify-between items-center py-4">
      <CustomPaginator
        total={totalPages}
        initialPage={currentPage}
        onChange={handlePageChange}
        // key={JSON.stringify(orders)}
      />
     
    </div>
    
  </div>;
};

export default ListManualOrderSelect;