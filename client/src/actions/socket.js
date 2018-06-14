import { createRequestTypes, createAction } from '../utils';


/** *************************************************
 * Init
 */
export const INIT_SOCKET = createRequestTypes('INIT_SOCKET');

export const init = {
  request: () => createAction(INIT_SOCKET.REQUEST),
  success: socket => createAction(INIT_SOCKET.SUCCESS, socket),
  failure: errors => createAction(INIT_SOCKET.FAILURE, { errors }),
};

/** *************************************************
 * Join room
 */
export const JOIN_ROOM = createRequestTypes('JOIN_ROOM');

export const joinRoom = {
  request: username => createAction(JOIN_ROOM.REQUEST, { username }),
  success: roomId => createAction(JOIN_ROOM.SUCCESS, { roomId }),
  failure: errors => createAction(JOIN_ROOM.FAILURE, { errors }),
};

/** *************************************************
 * Leave room
 */
export const LEAVE_ROOM = createRequestTypes('LEAVE_ROOM');

export const leaveRoom = {
  request: (username, roomId) => createAction(LEAVE_ROOM.REQUEST, { username, roomId }),
  success: () => createAction(LEAVE_ROOM.SUCCESS),
  failure: errors => createAction(LEAVE_ROOM.FAILURE, { errors }),
};
