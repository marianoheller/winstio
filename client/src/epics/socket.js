import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { race } from 'rxjs/observable/race';
import { concat } from 'rxjs/observable/concat';


import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


import * as socketActions from '../actions/socket';


export default action$ => action$
  .ofType(socketActions.INIT_SOCKET.REQUEST)
  .map(() => io.connect('http://localhost:3001'))
  .switchMap(socket => (
    race(
      Observable.fromEvent(socket, 'connect_error')
        .do(() => socket.disconnect())
        .map(() => socketActions.init.failure({ connection: 'connect_failed' })),
      Observable.fromEvent(socket, 'connect')
        .map(() => socketActions.init.success({ socket })),
    )
  ))
  .ofType(socketActions.INIT_SOCKET.FAILURE)
  .mergeMap(failureAction =>
    concat(
      Observable.of(failureAction),
      Observable.of(socketActions.init.request()).delay(10000),
    ));
