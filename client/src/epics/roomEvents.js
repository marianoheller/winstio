import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
// import { merge } from 'rxjs/observable/merge';
import { race } from 'rxjs/observable/race';
import { timer } from 'rxjs/observable/timer';


import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


import * as socketActions from '../actions/socket';


const ROOM_TIMEOUT_MS = 10000;

const joinRoom = (action$, store) => action$
  .ofType(socketActions.JOIN_ROOM.REQUEST)
  .map(action => ({
    socket: store.getState().socket.connection.socket,
    username: action.username,
  }))
  .filter(({ socket }) => Boolean(socket))
  .do(({ socket, username }) => socket.emit('joinRoom', username))
  .switchMap(({ socket }) => (
    race(
      Observable.fromEvent(socket, 'joinRoomFailed')
        .map(() => socketActions.joinRoom.failure({ joinRoom: 'displayErrorJoinRoomFailed?' })),
      Observable.fromEvent(socket, 'roomJoined')
        .map(e => socketActions.joinRoom.success(e)),
      timer(ROOM_TIMEOUT_MS).map(() => socketActions.joinRoom.failure({ joinRoom: 'timeout' })),
    )
  ));


const leaveRoom = (action$, store) => action$
  .ofType(socketActions.LEAVE_ROOM.REQUEST)
  .map(action => ({
    socket: store.getState().socket.connection.socket,
    username: action.username,
    roomId: action.roomId,
  }))
  .filter(({ socket }) => Boolean(socket))
  .filter(() => false);


export default combineEpics(
  joinRoom,
  leaveRoom,
);
