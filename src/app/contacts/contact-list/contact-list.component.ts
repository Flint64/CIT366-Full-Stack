import { Component, OnInit, OnDestroy} from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Contact[] = [];
  private subscription: Subscription;
  term: string;

  // onSelected(contact: Contact){
    // this.contactService.contactSelectedEvent.emit(contact);
  // }

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts();
    this.subscription = this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string){
    this.term = value;
  }

}

// This was on the search icon
// (click)="search(searchBox.value)"
