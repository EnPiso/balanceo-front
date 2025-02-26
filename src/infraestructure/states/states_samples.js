import {atom} from "recoil";

export const stepsSamples = atom({
  key: 'stepsSamples',
  default: [],
});


export const newSamples = atom({
  key: 'newSamples',
  default: false,
});
