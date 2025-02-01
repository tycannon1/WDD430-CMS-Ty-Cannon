import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model'

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  contacts: Contact[] = [
    new Contact('1', 'Bro. Barzeer', 'email1', 'phone1', '/assets/images/barzeer.jpg', null),
    new Contact('1', 'Bro. Jackson', 'email2', 'phone2', '/assets/images/jacksonk.jpg', null)
  ];

  constructor() {}

  ngOnInit() {

  }

}
