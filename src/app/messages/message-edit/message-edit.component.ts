import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @Input() message: Message;
  @ViewChild('subject', {static: false}) subject: ElementRef;
  @ViewChild('msgText', {static: false}) msgText: ElementRef;
  // @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = "18";

  onSendMessage(){
    let msgText = this.msgText.nativeElement.value;
    let subjectText = this.subject.nativeElement.value;
    let message = new Message('1', subjectText, msgText, this.currentSender);
    this.messagesService.addMessage(message);
    console.log(message)
    // this.addMessageEvent.emit(message);
    this.onClear();

  }

  onClear(){
    this.msgText.nativeElement.value = "";
    this.subject.nativeElement.value = "";
  }


  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
  }

}
