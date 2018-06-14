import { combineEpics } from 'redux-observable';

import socketKeepAlive from './socketKeepAlive';
import roomEvents from './roomEvents';

export default combineEpics(
  socketKeepAlive,
  roomEvents,
);
