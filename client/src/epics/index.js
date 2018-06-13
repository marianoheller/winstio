import { combineEpics } from 'redux-observable';

import socketKeepAlive from './socketKeepAlive';

export default combineEpics(socketKeepAlive);
