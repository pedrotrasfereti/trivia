import {
  SET_SCORE,
} from '../actions/game';

const INITIAL_STATE = {
  score: 0,
};

const header = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_SCORE:
    return {
      ...state, score: action.payload,
    };
  default:
    return state;
  }
};

export default header;
