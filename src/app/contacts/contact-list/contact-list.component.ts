import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  group = [];
  contacts = [
    new Contact("1", "Bro. Jackson", "Jacksonk@byui.edu","208-496-3771", "https://web.byui.edu/Directory/Employee/jacksonk.jpg", this.group),
    new Contact("2", "Bro. Barzee", "barzeer@byui.edu","208-496-3768", "https://web.byui.edu/Directory/Employee/barzeer.jpg", this.group)
  ];

  constructor() { }

  ngOnInit() {
  }

}
