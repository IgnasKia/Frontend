import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( private socket: Socket) { }

  sendMessage( user: string, text: string,): void {
    this.socket.emit('sendMessage', { sender: user, message: text});
  }

  getNewMessage(): Observable<string> {
    return this.socket.fromEvent<string>('newMessage');
  }
}
