import { Input, Tooltip } from '@nextui-org/react'
import React from 'react'
import { FaArrowLeftLong, FaMagnifyingGlass, FaTentArrowLeftRight } from 'react-icons/fa6';

const SearchOpersMaster = ({searchData, setSearchData, setQueryString}) => {

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleQueryString()
    }
  };

  const handleQueryString = () => {
    setQueryString(searchData)
  }

  const handleReset = () => {
    setSearchData("")
    setQueryString("")
  }


  return (
    <div>
      <div className="w-full flex justify-end px-1 py-1  rounded-lg">
        <button onClick={handleReset} className="focus:outline-none mr-2">
          <FaArrowLeftLong className='text-secondary_two'/>
        </button>
        <Tooltip content="Buscar Operario (ENTER)">
          <Input
            size="lg"
            value={searchData}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchData(e.target.value)}
            variant="bordered"
            placeholder="Buscar"
            className="w-full md:w-64 bg-white rounded-full"
            endContent={
              searchData.length >= 1 &&
                <button onClick={handleQueryString} className="focus:outline-none">
                  <FaMagnifyingGlass />
                </button>
            }
          />
        </Tooltip>
      </div>
    </div>
  )
}

export default SearchOpersMaster