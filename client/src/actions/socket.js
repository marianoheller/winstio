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
