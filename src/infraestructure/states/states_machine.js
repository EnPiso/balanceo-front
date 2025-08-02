import {atom} from "recoil";

export const machinesList = atom({
  key: 'machinesList',
  default: [],
});

export const selectAllMachines = atom({
  key: 'selectAllMachines',
  default: [],
});

