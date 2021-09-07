// Actions
export const SET_GAME_INFO = 'SET_GAME_INFO';
export const SET_ANSWERS = 'SET_ANSWERS';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';
export const TOGGLE_TIMER = 'TOGGLE_TIMER';
export const SET_TIMER = 'SET_TIMER';

// Action Creators
export const setGameInfo = (payload) => ({
  type: SET_GAME_INFO,
  payload,
});

export const setTimerGlobal = (payload) => ({
  type: SET_TIMER,
  payload,
});

export const setAnswers = (payload) => {
  console.log(payload);
  return ({
    type: SET_ANSWERS,
    payload,
  });
};

export const setAssertions = (assertions) => ({
  type: SET_ASSERTIONS,
  assertions,
});

export const toggleTimer = () => ({
  type: TOGGLE_TIMER,
});
