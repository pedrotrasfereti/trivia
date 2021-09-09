// Actions

export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_NUMBEROFQUESTIONS = 'SET_NUMBEROFQUESTIONS';
export const SET_DIFFICULT = 'SET_DIFFICULT';

// Action Creators
export const setCategory = (payload) => ({
  type: SET_CATEGORY,
  payload,
});

export const setNumberOfQuestions = (payload) => ({
  type: SET_NUMBEROFQUESTIONS,
  payload,
});

export const setDifficult = (payload) => ({
  type: SET_DIFFICULT,
  payload,
});
