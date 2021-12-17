import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-collection',
  templateUrl: './chat-collection.component.html',
  styleUrls: ['./chat-collection.component.css']
})
export class ChatCollectionComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  messages: any = { 
    general: Array(),
    trading: Array()
  }


  private subscriptions = new Subscription();

  currentUser: any = [];

  activeRoom: string = 'none';

  constructor(private chatService : ChatService, private apiService: ApiService) { }

  getCurrentUser(){
    this.subscriptions.add(this.apiService.getCurrentUserData().subscribe( data => {
      this.currentUser = data;
    }));
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.subscriptions.add(this.chatService.getNewMessage().subscribe((message: any) => {      
      this.messages[message.room].push(message);
    }));
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
    this.chatService.sendMessage('SERVER', this.activeRoom, `${this.currentUser.username} joined in this room` );

  }

  leaveRoom() {
    this.chatService.leaveRoom(this.activeRoom,  this.currentUser.username);
    this.chatService.sendMessage('SERVER', this.activeRoom, `${this.currentUser.username} left in this room` );
    this.activeRoom = "none";
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
