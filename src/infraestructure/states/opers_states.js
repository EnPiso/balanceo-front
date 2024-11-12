import {atom} from "recoil";

export const allOpers = atom({
  key: 'allOpers',
  default: [],
});
export const selectOpers = atom({
  key: 'selectOpers',
  default: [],
});

export const checkOpersPosition = atom({
  key: 'checkOpersPosition',
  default: [],
});