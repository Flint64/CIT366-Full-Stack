import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageChangeEvent = new Subject<Message[]>();
  maxMessageId: number;
  messages: Message[] = [];

  constructor(private http: HttpClient, private contactService: ContactService) {
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

  getMessages() {

    this.contactService.getContacts();

    this.http.get<{ message: string, messages: Message[] }>('http://localhost:3000/messages').subscribe(
      // success function
    (response) => {
      this.messages = response.messages;
      this.maxMessageId = this.getMaxId();
      this.messageChangeEvent.next(this.messages.slice());
      },
      (error: any) => {
        // console.log(error);
      });
  }

  getMessage(id: string){
    for (let message of this.messages){
      if (message.id === id){
        return message;
      }
    }
  }

  addMessage(newMessage: Message) {
    if (newMessage === null) {
        return;
      }
  
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
  
        newMessage.id = '';
        const strMessage = JSON.stringify(newMessage);
  
        this.http.post<{ message: string, messages: Message[] }>('http://localhost:3000/messages', strMessage, {headers: headers})
          .subscribe(() => {
            this.getMessages();
          })
  }

}
