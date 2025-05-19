import React, { useState, useEffect } from 'react'
import { IsOriginalProduct } from '../../../../../orders/manual/IsOriginalProduct'
import SearchManualProducts from '../../../../../orders/manual/SearchManualProducts';

const DashboardSearch = ({
  isFavorite, 
  setIsFavorite, 
  searchData, 
  setSearchData, 
  queryString, 
  setQueryString,
  dataSearchList,
  setDataSearchList}) => {
 
  useEffect(()=> {
    const data = {
      favorite: isFavorite,
      operation: queryString
    }

    setDataSearchList(data)
  }, [queryString, isFavorite])

  return (
    <div>
      <div className="flex justify-between items-center bg-zinc-50 px-1 rounded-md shadow-sm py-1 mb-2">
        <div>
          <IsOriginalProduct
            titleFalse="vídeos referentes"
            titleTrue="vídeos de operaciones"
            isOriginal={isFavorite}
            setIsOriginal={setIsFavorite}
          />
        </div>
        <div>
          <SearchManualProducts
            content="Buscar (ENTER)"
            searchData={searchData}
            setSearchData={setSearchData}
            setQueryString={setQueryString}
            placeholder="Buscar operación (ENTER)"
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardSearch