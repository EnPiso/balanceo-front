import {atom} from "recoil";

export const showOperationMasterObj = atom({
  key: 'showOperationMasterObj',
  default: null,
});


export const goToBalance = atom({
  key: 'goToBalance',
  default: null,
});


export const operationsProductManual = atom({
  key: 'operationsProductManual',
  default: [],
});

export const selectManualObj = atom({
  key: 'selectManualObj',
  default: null,
});

export const newManualObj = atom({
  key: 'newManualObj',
  default: { order: '', 
    products: []
  },
});



export const timeDataCyclesNum = atom({
  key: 'timeDataCyclesNum',
  default: 0,
});


export const isLoadingTime = atom({
  key: 'isLoadingTime',
  default: false,
});


export const isLoadingTimeByZone = atom({
  key: 'isLoadingTimeByZone',
  default: false,
});


export const operationsArrayMaster = atom({
  key: 'operationsArrayMaster',
  default: [],
});


