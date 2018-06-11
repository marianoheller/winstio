import { combineEpics } from 'redux-observable';

import socket from './socket';

export default combineEpics(socket);
