import {
  SET_CATEGORY,
  SET_NUMBEROFQUESTIONS,
  SET_DIFFICULT,
} from '../actions/settings';

const INITIAL_STATE = {
  numberOfQuestions: 5,
  category: 'Any Category',
  difficult: 'Any Difficulty',
  allCategories: [],
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_NUMBEROFQUESTIONS:
    return {
      ...state, score: action.payload,
    };
  case SET_CATEGORY:
    return {
      ...state, category: action.payload,
    };
  case SET_DIFFICULT:
    return {
      ...state, difficult: action.payload,
    };
  default:
    return state;
  }
};

export default settings;
