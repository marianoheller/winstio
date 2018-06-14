import * as socketActions from '../actions/socket';

const initState = {
  username: null,
  roomId: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case socketActions.JOIN_ROOM.REQUEST:
      return {
        ...state,
        username: action.username,
      };
    case socketActions.JOIN_ROOM.SUCCESS:
      return {
        ...state,
        roomId: action.roomId,
      };
    case socketActions.JOIN_ROOM.FAILURE:
      return {
        ...state,
        roomId: null,
      };
    default:
      return state;
  }
};
