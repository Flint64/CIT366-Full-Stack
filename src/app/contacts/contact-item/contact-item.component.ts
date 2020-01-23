import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../contacts/contacts.model';

// src\app\contacts\contacts.model.ts

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;

  constructor() { }

  ngOnInit() {
  }

}
