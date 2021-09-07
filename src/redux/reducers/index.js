import { combineReducers } from 'redux';
import login from './login';
import game from './game';
import header from './header';

const rootReducer = combineReducers({ login, game, header });

export default rootReducer;
