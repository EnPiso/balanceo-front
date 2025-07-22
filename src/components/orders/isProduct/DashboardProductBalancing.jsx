import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { FaPlay, FaPlayCircle, FaPlusCircle, FaSave } from 'react-icons/fa'
import { FaBarsProgress, FaLeftRight, FaRightLong } from 'react-icons/fa6'
import { Badge, Chip } from '@nextui-org/react'
import { newManualObj, operationsProductManual, selectManualObj } from '../../../infraestructure/states/operation_master_state'
import { IsOriginalProduct } from '../manual/IsOriginalProduct'
import SelectManualPlantModule from '../manual/SelectManualPlantModule'
import SearchManualProducts from '../manual/SearchManualProducts'
import { DateManualProduct } from '../manual/DateManualProduct'
import MyCustomButton from '../../../ui/MyCustomButton'
import ListManualOrderSelect from '../manual/ListManualOrderSelect'
import ListOperationsManual from '../manual/ListOperationsManual'
import ModalNewManualOrder from '../manual/ModalNewManualOrder'


const DashboardProductBalancing = ({setIsOpen}) => {
  const [searchData, setSearchData] = useState("");
  const [queryString, setQueryString] = useState("");

  const [isOriginal, setIsOriginal] = useState(true);
  
  const [isOpenManualModal, setIsOpenManualModal] = useState(false);

  const [image, setImage] = useState(null);
  

  const [modulesPlant, setModulesPlant] = useState([]);
  const [isModuleSelect, setIsModuleSelect] = useState(false);
  const [selectModule, setSelectModule] = useState('');

  const [dataSearchList,setDataSearchList] = useState(null)

  const [queryDate, setQueryDate] = useState(null); // Estado para el valor del input
  
  const [operations, setOperations] = useRecoilState(operationsProductManual)
  
  const [selectObj, setSelectObj] = useRecoilState(selectManualObj)
  
  const [newManual, setNewManual] = useRecoilState(newManualObj);
  

  const handleClean = () => {
    setQueryString("")
    setIsOpenManualModal(false)
    setSelectModule('')
    setQueryDate(null)
    setIsOpen(false)
    setNewManual(
      { order: '', 
        products: []
      }
    )
  }

  useEffect(()=> {
      let dataSearch
      if(isOriginal){
        dataSearch = {
          original: true
        }
        setQueryDate(null)
      } else {
        dataSearch = {
          has_opers_balancing: true
        }
      }
      setOperations([])
      setSelectObj(null)
      //console.log(dataSearch)
  },[isOriginal])

  useEffect(()=> {
    const data = {
      original: isOriginal,
      name: queryString,
      module: selectModule,
      created_at: queryDate
    }

    setDataSearchList(data)
  }, [queryString, isOriginal, selectModule, queryDate])
  // const formattedDate = queryDate ? queryDate.toString() : '';
  return (
    <div>
      <div className="flex justify-between items-center bg-zinc-50 px-1 rounded-md shadow-sm py-1 mb-2">
        <div>
          <IsOriginalProduct
            titleTrue="balanceos"
            titleFalse="originales"
            isOriginal={isOriginal}
            setIsOriginal={setIsOriginal}
          />
        </div>
        <div>
          <SelectManualPlantModule
            modulesPlant={modulesPlant}
            setModulesPlant={setModulesPlant}
            isModuleSelect={isModuleSelect}
            setIsModuleSelect={setIsModuleSelect}
            setSelectModule={setSelectModule}
            isOriginal={isOriginal}
          />
        </div>
        <div>
          <SearchManualProducts
            content="Buscar (ENTER)"
            searchData={searchData}
            setSearchData={setSearchData}
            setQueryString={setQueryString}
            placeholder="Buscar producto o referencia (ENTER)"
          />
        </div>
        <div>
          <DateManualProduct
            isOriginal={isOriginal}
            queryDate={queryDate}
            setQueryDate={setQueryDate}
          />
        </div>
        
      </div>
      
      {
        newManual.products.length >= 1 &&
          <MyCustomButton
            icon={null}
            title={`${newManual.products[0].product.name.toUpperCase()} / Continuar ▶ `} 
            handleClick={()=> setIsOpenManualModal(true)}
            value={`${newManual.products[0].product.name.toUpperCase()} / Continuar ▶`} 
            bgButton={"bg-zinc-800"}
            textButton={"text-secondary_two"}
          />
      }

      <div className="row grid grid-cols-2 gap-4">
        <div>
          <ListManualOrderSelect
            setIsOpenManualModal={setIsOpenManualModal}
            newManual={newManual}
            dataSearchList={dataSearchList}
          />
        </div>
        <div>
          <ListOperationsManual/>
        </div>
      </div>

      {
        isOpenManualModal &&
          <ModalNewManualOrder
            isOpen={isOpenManualModal}
            setIsOpen={setIsOpenManualModal}
            handleClean={handleClean}
            image={image}
            setIsOpenMaster={setIsOpen}

          />
      }
      
      
    </div>
  )
}

export default DashboardProductBalancing