import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;


  newMessage$: Observable<string>;
  messages = Array();
  currentBalance: number;
  private subscriptions = new Subscription();
  currentUser: any = [];
  
  constructor( private chatService : ChatService, private apiService: ApiService) { }

  getCurrentUser(){
    this.subscriptions.add(this.apiService.getUser().subscribe( data => {
      this.currentUser = data;
      this.currentBalance = this.currentUser.balance;
    }));
  }

  ngOnInit(){
    this.getCurrentUser();
    return this.chatService.getNewMessage().subscribe((message: string) => {
      this.messages.push(message);
    })
  }

  onSubmit(){
    const { message } = this.form.value;
    if(!message) return;
    this.chatService.sendMessage(this.currentUser.username, message );
    this.form.reset();
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
