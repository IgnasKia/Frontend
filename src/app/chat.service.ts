import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( private socket: Socket) { }

  sendMessage( user: string, roomName: string, text: string): void {
    this.socket.emit('sendMessage', { sender: user, room: roomName, message: text});
  }

  getNewMessage(): Observable<string> {
    return this.socket.fromEvent<string>('newMessage');
  }

  joinRoom(roomName: string, user: string) {
    this.socket.emit('joinRoom', { room: roomName, sender: user});
  }

  leaveRoom(roomName: string, user: string) {
    this.socket.emit('leaveRoom', { room: roomName, sender: user});
  }

}


