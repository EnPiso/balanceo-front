import {atom} from "recoil";

export const stepsSamples = atom({
  key: 'stepsSamples',
  default: [],
});


export const newSamples = atom({
  key: 'newSamples',
  default: false,
});



export const operationsSamples = atom({
  key: 'operationsSamples',
  default: [],
});



/// openOperaClock

export const openOperaClock = atom({
  key: 'openOperaClock',
  default: null,
});



export const isOpenModalSample = atom({
  key: 'isOpenModalSample',
  default: false,
});

export const openByOper = atom({
  key: 'openByOper',
  default: false,
});

export const automaticByOper = atom({
  key: 'automaticByOper',
  default: false,
});

export const isOpenModalSampleByOper = atom({
  key: 'isOpenModalSampleByOper',
  default: false,
});

export const operByOper = atom({
  key: 'operByOper',
  default: null,
});

export const isSampleObj = atom({
  key: 'isSampleObj',
  default: false,
});

//isSample

//isOpenByOper
// isAutomaticByOper
