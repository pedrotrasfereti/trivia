import { NEXTBUTTON_PRESS, QUESTION_PRESS } from '../actions/pressBtn';
import {
  SET_GAME_INFO,
  SET_ANSWERS,
  SET_ASSERTIONS,
  TOGGLE_TIMER,
  SET_TIMER,
} from '../actions/game';

const INITIAL_STATE = {
  game: [], // O array de perguntas
  questionNumber: 0, // O número da pergunta
  timer: 30,
  answers: [], // Array de respostas
  assertions: 0, // Número de acertos
  timerOn: false, // Liga/Desliga temporizador
  disable: true, // Habilitar nova pergunta
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEXTBUTTON_PRESS:
    return {
      ...state, questionNumber: state.questionNumber + 1, disable: true,
    };
  case QUESTION_PRESS:
    return {
      ...state, disable: false,
    };
  case SET_GAME_INFO:
    return {
      ...state, game: action.payload,
    };
  case SET_ANSWERS:
    return {
      ...state, answers: action.payload,
    };
  case SET_ASSERTIONS:
    return {
      ...state, assertions: (state.assertions + action.assertions),
    };
  case TOGGLE_TIMER:
    return {
      ...state, timerOn: !state.timerOn,
    };
  case SET_TIMER:
    return {
      ...state, timer: action.payload,
    };
  default:
    return state;
  }
};

export default game;
