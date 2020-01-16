import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  group = [];
  contact = new Contact("1", "Bro. Jackson", "Jacksonk@byui.edu","208-496-3771", "https://web.byui.edu/Directory/Employee/jacksonk.jpg", this.group);

  constructor() { }

  ngOnInit() {
  }

}
