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

export const productionPlants = atom({
  key: 'productionPlants',
  default: [],
});

export const selectProdPlant = atom({
  key: 'selectProdPlant',
  default: null,
})
export const selectProdPlantOriginal = atom({
  key: 'selectProdPlantOriginal',
  default: null,
});


export const isNewModule = atom({
  key: 'isNewModule',
  default: [],
});


export const isShowOperMaster = atom({
  key: 'isShowOperMaster',
  default: null,
});

