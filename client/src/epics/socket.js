import io from 'socket.io-client';
import { Observable } from 'rxjs';

import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';

import * as socketActions from '../actions/socket';


export default action$ =>
  action$.ofType(socketActions.INIT_SOCKET.REQUEST)
    .switchMap(() =>
      Observable.create((observer) => {
        observer.next(io.connect('http://localhost:3001'));
      }))
    .do(() => console.log('Trying to connect...'))
    .race(ioClient => 
      fromEvent(ioClient, 'connection')
        .
    )
    .filter(d => d === 123123123);
    
    /*
          const ioClient = io.connect('http://localhost:3001');
          ioClient.on('connection', (socket) => {
          console.log('connection!');
          observer.next(socketActions.init.success(socket));
          socket.off('connect');
          observer.complete();
        }); */

/* 

    .switchMap(() =>
      Observable.create((observer) => {
        io.connect('http://localhost:3001');
        io.on('connection', (socket) => {
          Observable.fromEvent(socket, 'connect')
            .do(() => console.log('CONNECTed!!!'))
            .filter(data => data === true)
            .forEach(data => data);

          Observable.fromEvent(socket, 'connect_failed')
            .do(() => console.log('Connection FAILED!!!'))
            .filter(data => data === true)
            .forEach(data => data);
        });

        
        socket.on('connect', () => {
          
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
*/


