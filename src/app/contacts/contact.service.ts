import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactChangedEvent = new Subject<Contact[]>();

  contacts: Contact[];
  maxContactId: number;

  constructor(private http: HttpClient) { 
    this.contacts = [];
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http.get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts').subscribe(
      // success function
    (response) => {
      this.contacts = response.contacts;
      this.maxContactId = this.getMaxId();
      this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      this.contactChangedEvent.next(this.contacts.slice());
      }
    ),
      (error: any) => {
        console.log(error);
      }
  }

  // storeContacts(){
  //   const contacts = this.contacts;
  //   const contactsJSON = JSON.stringify(contacts);
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //     })
  //   };
  //   this.http.put('https://fir-e1179.firebaseio.com/contacts.json', contactsJSON, httpOptions).subscribe(response => {
  //     console.log(response);
  //     this.contactChangedEvent.next(contacts.slice());
  //   });
  // }

  getContact(id: string): Contact{
    for (let contact of this.contacts){
      if (contact.id === id){
        return contact;
      }
    }
  }

  deleteContact(contact: Contact){
    if (contact === null){
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(() => {
        this.getContacts();
      });
  }

  getMaxId(): number {

    let maxId = 0;

    this.contacts.forEach(e => {

      let currentId = +e.id;
        if (currentId > maxId){
          maxId = currentId;
        }
    });

    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null) {
        return;
      }

        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
  
        newContact.id = '';
        const strContact = JSON.stringify(newContact);
  
        this.http.post<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts', strContact, {headers: headers})
          .subscribe(() => {
            this.getContacts();
          })
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact === null || newContact === null){
      return;
    }

      const pos = this.contacts.indexOf(originalContact);
      if (pos < 0){
        return;
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      const strContact = JSON.stringify(newContact);

      this.http.put('http://localhost:3000/contacts/' + originalContact.id, strContact, {headers: headers})
        .subscribe(() => {
          this.getContacts();
        })
  }

}
