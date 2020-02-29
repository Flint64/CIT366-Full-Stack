import { Component, OnInit } from '@angular/core';
import { Contact } from '../../contacts/contacts.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  id: string;
  originalContact: Contact;
  invalidGroupContact: boolean;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {

      this.id = params.id;

      if (this.id === null || this.id === undefined){
        this.editMode = false;
        console.log(this.editMode);
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);
      if (this.originalContact === null){
        return;
      }
      this.editMode = true;
      this.contact = this.originalContact;

      console.log(this.editMode);

      if (this.contact.group != null || this.contact.group != undefined){
        this.groupContacts = this.originalContact.group.slice();
      }

    })
  }
  
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit(form: NgForm){

    let newContact = new Contact(this.id, form.value['name'], form.value['email'], form.value['phone'], form.value['url'], this.groupContacts);
    if (this.editMode){
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['../'], {relativeTo: this.route});

  }

  isInvalidContact(newContact: Contact){
    if (!newContact){
      return true;
    }

    if (newContact.id === this.contact.id){
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any){
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number){
    if (idx< 0 || idx >= this.groupContacts.length){
      return;
    }

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
