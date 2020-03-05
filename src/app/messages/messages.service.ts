import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;
  messages: Message[];

  constructor(private http: HttpClient) { 
    this.getMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach(e => {
      let currentId = +e.id;
        if (currentId > maxId){
          maxId = currentId;
        }
    });
    return maxId;
  }

  getMessages(){
    this.http.get('https://fir-e1179.firebaseio.com/messages.json').subscribe(
      // success function
    (messages: Message[] ) => {
      this.messages = messages
      this.maxMessageId = this.getMaxId()
      this.messageChangeEvent.next(messages.slice());
      }
    ),
      (error: any) => {
        console.log(error);
      } 
  }

  storeMessages(){
    const messages = this.messages;
    const messagesJSON = JSON.stringify(messages);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    this.http.put('https://fir-e1179.firebaseio.com/messages.json', messagesJSON, httpOptions).subscribe(response => {
      console.log(response);
      this.messageChangeEvent.next(messages.slice());
    });
  }

  getMessage(id: string){
    for (let message of this.messages){
      if (message.id === id){
        return message;
      }
    }
  }

  addMessage(message: Message){
    this.messages.push(message);
    // this.messageChangeEvent.emit(this.messages.slice());
    this.storeMessages();
  }

}
