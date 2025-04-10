import {atom} from "recoil";

export const isShowModalZoneSample = atom({
  key: 'isShowModalZoneSample',
  default: false,
});

export const zoneOperSampleObj = atom({
  key: 'zoneOperSampleObj',
  default: null,
});

export const zonesSamplesList = atom({
  key: 'zonesSamplesList',
  default: [],
});

export const zonesSamplesDetail = atom({
  key: 'zonesSamplesDetail',
  default: null,
});
