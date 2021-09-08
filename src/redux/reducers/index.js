import { combineReducers } from 'redux';
import login from './login';
import game from './game';
import header from './header';
import timer from './timer';

const rootReducer = combineReducers({ login, game, header, timer });

export default rootReducer;
