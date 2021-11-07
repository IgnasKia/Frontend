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

  joinRoom(room: string, user: any){
    this.socket.emit('joinRoom', room, user);
  }

  leaveRoom(room: string) {
    this.socket.emit('leaveRoom', room);
  }


}
