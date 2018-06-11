import { combineReducers } from 'redux';
import socket from './socket';

const appReducer = combineReducers({
  socket,
});


export default (state, action) => appReducer(state, action);
