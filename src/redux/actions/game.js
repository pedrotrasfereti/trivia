// Actions
export const SET_GAME_INFO = 'SET_GAME_INFO';

// Action Creators
export const setGameInfo = (payload) => {
  console.log(payload);
  return ({
    type: SET_GAME_INFO,
    payload,
  });
};
