import * as socketActions from '../actions/socket';

const initState = {
  socket: null,
  isLoading: false,
  errors: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case socketActions.INIT_SOCKET.REQUEST:
      return {
        ...state,
        // socket: null,
        isLoading: true,
        errors: {},
      };
    case socketActions.INIT_SOCKET.SUCCESS:
      return {
        ...state,
        socket: action.socket,
        isLoading: false,
        errors: {},
      };
    case socketActions.INIT_SOCKET.FAILURE:
      return {
        ...state,
        socket: null,
        isLoading: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};
