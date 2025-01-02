import {atom} from "recoil";

export const orderList = atom({
  key: 'orderList',
  default: [],
});

export const showOrderObj = atom({
  key: 'showOrderObj',
  default: null,
});

export const orderObjBalancing = atom({
  key: 'orderObjBalancing',
  default: null,
});

export const isPDFGenerate = atom({
  key: 'isPDFGenerate',
  default: false,
});


export const imageBalancePdf = atom({
  key: 'imageBalancePdf',
  default: '',
});

