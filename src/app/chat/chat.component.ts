import { generateAnalysis } from '@angular/compiler-cli/src/ngtsc/indexer';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { mergeScan } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;

  count: number;

  newMessage$: Observable<string>;

  messages: any = { 
    general: Array(),
    trading: Array()
  }

  currentBalance: number;

  private subscriptions = new Subscription();

  currentUser: any = [];

  rooms: {
    general: false,
    trading: false
  };
  activeRoom: string = 'general';
  changeRooms: string;
  joinedUser: any = [];
  
  constructor( private chatService : ChatService, private apiService: ApiService) { }

  getCurrentUser(){
    this.subscriptions.add(this.apiService.getUser().subscribe( data => {
      this.currentUser = data;
      this.currentBalance = this.currentUser.balance;
    }));
  }

  ngOnInit(){
    this.getCurrentUser();
    this.chatService.joinRoom(this.activeRoom, this.currentUser.username);
    this.chatService.getNewMessage().subscribe((message: any) => {      
      this.messages[message.room].push(message);
    });
  }

  onSubmit(){
    const { message } = this.form.value;
    if(!message) return;
    this.chatService.sendMessage(this.currentUser.username, this.activeRoom, message );
    this.form.reset();
  }

  roomClicked(room: string) {
    this.activeRoom = room;
    this.chatService.joinRoom(this.activeRoom, this.currentUser.username);

  }

  leaveRoom() {
    this.chatService.leaveRoom(this.activeRoom);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
