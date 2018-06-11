import io from 'socket.io-client';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';

import * as socketActions from '../actions/socket';

export default action$ =>
  action$.ofType(socketActions.INIT_SOCKET.REQUEST)
    .switchMap(() =>
      Observable.create((observer) => {
        const socket = io.connect('http://localhost:3001');
        console.log("AAALLLLAAA");
        socket.on('connect', () => {
          console.log("CONNECT!!!")
          observer.next(socketActions.init.success(socket));
          socket.off('connect');
          observer.complete();
        });
        socket.on('connect_failed', () => {
          console.log("CONNTECT FAILED");
          observer.next(socketActions.init.failure({ connection: 'connect_failed' }));
          socket.off('connect_failed');
          observer.error();
        });
      }));
