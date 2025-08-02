import { Input, Tooltip } from '@nextui-org/react'
import React from 'react'
import { FaArrowLeftLong, FaMagnifyingGlass, FaReplyAll, FaTentArrowLeftRight } from 'react-icons/fa6';

const SearchMachinesMaster = ({searchData, setSearchData, setQueryString, tooltip}) => {

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
          <FaReplyAll className='text-secondary_two' size={24}/>
        </button>
        <Tooltip content={tooltip}>
          <Input
            size="lg"
            value={searchData}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchData(e.target.value)}
            variant="bordered"
            placeholder="Buscar (ENTER)"
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

export default SearchMachinesMaster