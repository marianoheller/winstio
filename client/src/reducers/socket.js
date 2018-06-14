import * as socketActions from '../actions/socket';

const initState = {
  connection: {
    socket: null,
    retry: true,
    isConnecting: false,
    errors: {},
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case socketActions.INIT_SOCKET.REQUEST:
      return {
        ...state,
        connection: {
          ...state.connection,
          // socket: null,
          isConnecting: true,
          errors: {},
        },
      };
    case socketActions.INIT_SOCKET.SUCCESS:
      return {
        ...state,
        connection: {
          ...state.connection,
          socket: action.socket,
          isConnecting: false,
          errors: {},
        },
      };
    case socketActions.INIT_SOCKET.FAILURE:
      return {
        ...state,
        connection: {
          ...state.connection,
          socket: null,
          isConnecting: false,
          errors: action.errors,
        },
      };
    default:
      return state;
  }
};
