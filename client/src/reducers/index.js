import { combineReducers } from 'redux';
import socket from './socket';
import room from './room';

const appReducer = combineReducers({
  socket,
  room,
});


export default (state, action) => appReducer(state, action);
