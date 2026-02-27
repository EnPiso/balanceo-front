import React, { useEffect, useState } from 'react'
import { fetchGetData, fetchGetDataToken } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import { activateUser, allUsers, tokenMemory } from '../../infraestructure/states/states_views';
import { useRecoilState } from 'recoil';
import { FaFileArchive, FaHardHat, FaPlus } from 'react-icons/fa';
import ModalAddUser from './ModalAddUser';
import { CircularProgress, Switch } from '@nextui-org/react';
import SearchOpersMaster from '../opers_master/SearchOpersMaster';
import CustomPaginator from '../../ui/CustomPaginator';
import SelectRoles from './SelectRoles';
import SelectRoleSearch from './SelectRoleSearch';
import { FaArrowLeftLong, FaMagnifyingGlass } from 'react-icons/fa6';
import ArchiveUser from './ArchiveUser';
import ReloadPassword from './ReloadPassword';
import SelectEditRole from './SelectEditRole';

const IndexUsers = () => {

  const [users, setUsers] = useRecoilState(allUsers);

  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useRecoilState(tokenMemory);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(10); // Total de páginas

  const [searchData, setSearchData] = useState("");
  const [queryString, setQueryString] = useState("");

  const totalPaginate = [5, 10, 20, 50];

  const [roleSearch, setRoleSearch] = useState("");

  const [isSearch, setIsSearch] = useState(true);

  const [activate, setActivate] = useRecoilState(activateUser);
  
  
  
  useEffect(() => {
    if (!token) return; // No cargar hasta tener token

    const getData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchGetDataToken(`${urlMain}users?page=${currentPage}&per_page=${perPage}&activate=${activate}&q[name_or_email_cont]=${encodeURIComponent(queryString)}&q[role_eq]=${encodeURIComponent(roleSearch)}`, token);
        
        setUsers(result.users)
        setTotalPages(result.total_pages)
        setCurrentPage(result.current_page)

      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
      }
    };

    getData();
  }, [token,currentPage,perPage,queryString,roleSearch, activate]); 

  const handlePageChange = (page) => { 
    setCurrentPage(page);
  }  
    

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className='flex justify-start items-center space-x-4'>
          {
            isSearch ? 
              <button onClick={() => setIsSearch(false)} className="text-secondary_two">
                <FaMagnifyingGlass size={24} />
              </button> :
              <div className='flex justify-between items-center space-x-2'>
                <SearchOpersMaster
                    searchData={searchData}
                    setSearchData={setSearchData}
                    setQueryString={setQueryString}
                    tooltipText={"Buscar email o nombre"}
                    setRoleSearch={setRoleSearch}
                    setIsSearch={setIsSearch}
                />

                <SelectRoleSearch
                  formData={roleSearch}
                  setFormData={setRoleSearch}
                />
              </div>
          }

          <span className="flex justify-start">
            <small className={`mt-1 mr-3 ${activate ? 'text-red-500' : 'text-secondary_two'} `}>
              Usuarios {
                activate ? "Archivados" : "Activos"
              } 
            </small>

            
            <Switch
              isSelected={activate}
              onValueChange={setActivate}
              color="default"
              size="sm"
            />
            
          </span>
          
        </div>

        <button>
          <FaPlus 
            onClick={() => setIsOpen(true)}
            size={24} 
            className="text-secondary_two" />
        </button>
      </div>
      {
        isLoading ?
          <div className="flex justify-center items-center">
            <CircularProgress color="default" />
          </div> : 
          <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
            <thead>
              <tr className="dark:bg-gray-100 bg-zinc-200 text-zinc-100 dark:text-zinc-800 sticky top-0">
                <th className="p-4 font-medium border border-gray-300 text-left text-zinc-800">
                  <span className={!activate ? "text-red-500" : "text-secondary_two"}>
                    Email
                  </span>
                  
                </th>
                <th className="p-4 font-medium border border-gray-300 text-left text-zinc-800">
                  <span className={!activate ? "text-red-500" : "text-secondary_two"}>
                    Nombre
                  </span>
                  
                </th>
                <th className="p-4 font-medium border border-gray-300 text-left text-zinc-800 flex justify-between items-center">
                  
                  <span className={!activate ? "text-red-500" : "text-secondary_two"}>
                    Rol
                  </span>
                  <div className="flex justify-end space-x-4 mr-2"> {/* Alinea los elementos horizontalmente y agrega espacio */}
                      {totalPaginate.map((page, i) => (
                      <span
                          onClick={() => setPerPage(page)}
                          className={`cursor-pointer ${perPage === page && 'text-secondary_two'}`}
                          key={i}
                      >
                          {page}
                      </span>
                      ))}
                  </div>
                </th>
              </tr>
            </thead>
            
            <tbody>
              {users?.map((user) => (
                <tr key={user.id} className={`${user.role === 'admin' ? 'bg-zinc-150' : 'bg-white'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
                  <td className="p-3 border border-gray-300 ">
                    {user.email}
                  </td>
                  <td className="p-3 border border-gray-300 ">
                    {user.name}
                  </td>
                  <td className="p-3 border border-gray-300  capitalize flex justify-between items-center">
                    <span className="flex justify-start">
                      <SelectEditRole user={user}/>


                      
                    </span>
                    <div className='flex justify-between items-center space-x-2'>
                      
                      <ReloadPassword user={user}/>
                      <ArchiveUser user={user}/>
                    </div>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      }
      
      
      <ModalAddUser
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex justify-start py-4">
          <CustomPaginator
              total={totalPages}
              initialPage={currentPage}
              onChange={handlePageChange}
              />
      </div> 

    </div>
  )
}

export default IndexUsers