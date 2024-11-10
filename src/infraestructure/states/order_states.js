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