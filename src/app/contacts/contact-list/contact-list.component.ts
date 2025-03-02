import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {} // Inject Router

  ngOnInit(): void {
    console.log('ContactListComponent Initialized');
    this.contacts = this.contactService.getContacts();
    console.log('Contacts in List:', this.contacts);

    this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        console.log('Updated Contacts:', this.contacts);
      }
    );
  }

  onSelected(contact: Contact) {
    // Emit the event (if needed)
    this.contactService.contactSelectedEvent.next(contact);

    // Navigate to the contact detail page
    this.router.navigate(['/contacts', contact.id]);
  }
}




