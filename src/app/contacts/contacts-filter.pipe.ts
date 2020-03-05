import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts.model';

@Pipe({
  name: 'contactsFilter',
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string) {

    let filteredArray: Contact[] = [];

    if (term && term.length > 0){

    filteredArray = contacts.filter(
      (contact: Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
    );

  }

    if (filteredArray.length > 0){
      return filteredArray;
    } else {
      return contacts;
    }

  }
}

/*

filteredArray = contacts.filter((contact: Contact) => {
      contact.name.toLocaleLowerCase().includes(term.toLocaleLowerCase());
      console.log(filteredArray);
    });

    for (let i = 0; i < contacts.length; i++){
      let contact = contacts[i];
      if (contact.name.toLocaleLowerCase().includes(term)) {
        filteredArray.push(contact);
      }
    }

*/
