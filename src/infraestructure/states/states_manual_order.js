import {atom} from "recoil";

export const isModalManual = atom({
  key: 'isModalManual',
  default: false,
});

export const isModalProdBalancing = atom({
  key: 'isModalProdBalancing',
  default: false,
});

export const isShowCreateProdBal = atom({
  key: 'isShowCreateProdBal',
  default: false,
});


export const isOrderOrProduct = atom({
  key: 'isOrderOrProduct',
  default: true,
});
