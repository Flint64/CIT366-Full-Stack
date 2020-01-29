import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @Input() message: Message;
  @ViewChild('subject', {static: false}) subject: ElementRef;
  @ViewChild('msgText', {static: false}) msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = "Flint64";

  onSendMessage(){
    let msgText = this.msgText.nativeElement.value;
    let subjectText = this.subject.nativeElement.value;
    
    let message = new Message(1, subjectText, msgText, this.currentSender);

    this.addMessageEvent.emit(message);

    // this.msgText.nativeElement.value = "";
    // this.subject.nativeElement.value = "";
    this.onClear();

  }

  onClear(){
    this.msgText.nativeElement.value = "";
    this.subject.nativeElement.value = "";
  }



  constructor() { }

  ngOnInit() {
  }

}
