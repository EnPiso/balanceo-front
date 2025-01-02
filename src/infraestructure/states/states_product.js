import {atom} from "recoil";
import { createRef } from 'react';

export const selectProduct = atom({
  key: 'selectProduct',
  default: null,
});



export const imageTableBalancing = atom({
  key: 'imageTableBalancing', // Debe ser único
  default: null, // Inicializa con createRef
});

export const imageTableUrl = atom({
  key: 'imageTableUrl', // Debe ser único
  default: null, // Inicializa con createRef
});