import {atom} from "recoil";

export const mainTheme = atom({
  key: 'mainTheme',
  default: 'light',
});

export const currentUser = atom({
  key: 'currentUser',
  default: null,
});

export const isShowModalLogIn = atom({
  key: 'isShowModalLogIn',
  default: false,
});


export const isLoadingUser = atom({
  key: 'isLoadingUser',
  default: true,
});


export const allUsers = atom({
  key: 'allUsers',
  default: [],
});

const token = localStorage.getItem('token');

export const tokenMemory = atom({
  key: 'tokenMemory',
  default: token ? token : '',
});

export const temporalTokenObj = atom({
  key: 'temporalTokenObj',
  default: null,
});

export const activateUser = atom({
  key: 'activateUser',
  default: true,
});
