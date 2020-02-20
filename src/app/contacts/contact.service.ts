import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactChangedEvent = new Subject<Contact[]>();

  contacts: Contact[];
  maxContactId: number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

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

    const pos = this.contacts.indexOf(contact);
    if (pos < 0){
      return;
    }

    this.contacts.splice(pos, 1);
    const contactsListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactsListClone);
    // this.contactChangedEvent.next(this.contacts.slice());
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
    } else {
      this.maxContactId++;
      newContact.id = this.maxContactId.toString();
      this.contacts.push(newContact);
      let ContactsListClone = this.contacts.slice();
      this.contactChangedEvent.next(ContactsListClone);
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact === null || newContact === null){
      return;
    } else {
      const pos = this.contacts.indexOf(originalContact);
      if (pos < 0){
        return;
      } else {
        newContact.id = originalContact.id;
        Contact[pos] = newContact;
        let ContactsListClone = this.contacts.slice();
        this.contactChangedEvent.next(ContactsListClone);
      }
    }
  }

}
