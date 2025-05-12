import React, { useState, useEffect } from 'react'
import ListManualOrderSelect from './ListManualOrderSelect'
import { IsOriginalProduct } from './IsOriginalProduct'
import SelectManualPlantModule from './SelectManualPlantModule'
import SearchManualProducts from './SearchManualProducts'
import { DateManualProduct } from './DateManualProduct'
import ListOperationsManual from './ListOperationsManual'
import { useRecoilState } from 'recoil'
import { newManualObj, operationsProductManual, selectManualObj } from '../../../infraestructure/states/operation_master_state'
import ModalNewManualOrder from './ModalNewManualOrder'
import { FaPlayCircle, FaPlusCircle, FaSave } from 'react-icons/fa'
import { FaBarsProgress, FaLeftRight, FaRightLong } from 'react-icons/fa6'
import { Badge, Chip } from '@nextui-org/react'
import PasteImageManual from './PasteImageManual'
import MyCustomButton from '../../../ui/MyCustomButton'

const DashboardManualOrder = ({setIsOpen}) => {
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
            title={`${newManual.products.length} ${ newManual.products.length > 1 ? 'Productos seleccionados' : 'Producto seleccionado'}  / Ver orden `} 
            handleClick={()=> setIsOpenManualModal(true)}
            value={`${newManual.products.length} ${ newManual.products.length > 1 ? 'Productos seleccionados' : 'Producto seleccionado'}  / Ver orden `} 
            bgButton={"bg-zinc-800"}
            textButton={"text-secondary_two"}
          />
      }
      
      <PasteImageManual
        image={image}
        setImage={setImage}
      />
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

          />
      }
      
      
    </div>
  )
}

export default DashboardManualOrder