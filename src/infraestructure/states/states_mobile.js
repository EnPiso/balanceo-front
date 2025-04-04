import {atom} from "recoil";

export const zonesMobile = atom({
  key: 'zonesMobile',
  default: [],
});

export const clockGlobalModal = atom({
  key: 'clockGlobalModal',
  default: false,
});

export const samplingsCircleList = atom({
  key: 'samplingsCircleList',
  default: [],
});

export const samplingsCircleObj = atom({
  key: 'samplingsCircleObj',
  default: null,
});


export const loadingSamplingsCircle = atom({
  key: 'loadingSamplingsCircle',
  default: false,
});


