import io from 'socket.io-client';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';


import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


import * as socketActions from '../actions/socket';

const RETRY_INTERVAL_MS = 10000;


const connectSocket = action$ => action$
  .ofType(socketActions.INIT_SOCKET.REQUEST)
  .map(() => io.connect('http://localhost:3001'))
  .switchMap(socket => (
    merge(
      Observable.fromEvent(socket, 'connect_error')
        .do(() => socket.disconnect())
        .map(() => socketActions.init.failure({ connection: 'connect_failed' })),
      Observable.fromEvent(socket, 'connect')
        .map(() => socketActions.init.success({ socket })),
    )
  ));


const retryConnection = (action$, store) => action$
  .ofType(socketActions.INIT_SOCKET.FAILURE)
  .filter(() => store.getState().socket.connection.retry)
  .switchMap(() => (
    Observable.of(socketActions.init.request()).delay(RETRY_INTERVAL_MS)
  ));


export default combineEpics(
  connectSocket,
  retryConnection,
);
