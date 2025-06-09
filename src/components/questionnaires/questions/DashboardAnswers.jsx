import React, { useEffect } from 'react'
import { fetchGetData } from '../../../infraestructure/call_api/crud';
import { urlMain } from '../../../infraestructure/data/const';
import SearchQuestion from './SearchQuestion';

const DashboardAnswers = () => {

  return (
    <div>
      <SearchQuestion/>
    </div>
  )
}

export default DashboardAnswers