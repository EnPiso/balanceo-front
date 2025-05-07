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
