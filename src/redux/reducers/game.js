import { SET_GAME_INFO } from '../actions/game';

const INITIAL_STATE = {
  games: [],
  question: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
