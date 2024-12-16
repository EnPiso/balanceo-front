import {atom} from "recoil";

export const sideBarNav = atom({
  key: 'sideBarNav',
  default: 1,
});


export const isOperationClone = atom({
  key: 'isOperationClone',
  default: false,
});


export const dataObjClone = atom({
  key: 'dataObjClone',
  default: null,
});

