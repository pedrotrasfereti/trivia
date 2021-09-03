import { NEXTBUTTON_PRESS } from '../actions/pressBtn';

const INITIAL_STATE = {
  questionNumber: 1,
  disable: true,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEXTBUTTON_PRESS:
    return {
      questionNumber: state.questionNumber + 1,
      disable: !state.disable,
    };
  case QUESTION_PRESS:
    return {
      disable: !state.disable,
    };
  default:
    return state;
  }
};

export default game;
