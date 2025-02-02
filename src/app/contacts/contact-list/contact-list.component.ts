import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  standalone: false,
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact('1', 'Bro. Barzeer', 'email1', 'phone1', '/assets/images/barzeer.jpg', null),
    new Contact('2', 'Bro. Jackson', 'email2', 'phone2', '/assets/images/jacksonk.jpg', null)
  ];

  constructor() {}

  ngOnInit() {}

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}

