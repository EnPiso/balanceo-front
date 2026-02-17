import {atom} from "recoil";

export const arrayQuestionnaires = atom({
  key: 'arrayQuestionnaires',
  default: [],
});

export const objQuestionnaireShow = atom({
  key: 'objQuestionnaireShow',
  default: null,
});

export const tabsQuestionnaires = atom({
  key: 'tabsQuestionnaires',
  default: [],
});

export const questionnaireResList = atom({
  key: 'questionnaireResList',
  default: [],
});

export const questionsLisCheck = atom({
  key: 'questionsLisCheck',
  default: [],
});

export const TabLoadingBlock = atom({
  key: 'TabLoadingBlock',
  default: false,
});



// 
