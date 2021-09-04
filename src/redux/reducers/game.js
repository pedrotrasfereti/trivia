import { NEXTBUTTON_PRESS, QUESTION_PRESS } from '../actions/pressBtn';
import { SET_GAME_INFO } from '../actions/game';

const INITIAL_STATE = {
  games: [],
  question: 0,
  disable: true,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEXTBUTTON_PRESS:
    return {
      ...state,
      question: state.question + 1,
      disable: true,
    };
  case QUESTION_PRESS:
    return {
      ...state,
      disable: false,
    };
  case SET_GAME_INFO:
    return {
      ...state,
      games: action.payload,
    };
  default:
    return state;
  }
};

export default game;
