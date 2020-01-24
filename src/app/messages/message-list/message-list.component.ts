import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  
  messages: Message[] = [
    new Message(1, "Prices", "These prices are too high!", "BossMan"),
    new Message(2, "Prices", "But you set them sir", "scared_worker"),
    new Message(3, "Termination", "You're fired!", "BossMan")
  ];


  constructor() { }

  ngOnInit() {
    console.log(this.messages);
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
