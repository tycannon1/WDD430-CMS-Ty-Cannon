import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  term: string = '';
  private subscription: Subscription; //   Handle subscription

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    //   Trigger Firebase request
    this.contactService.getContacts();

    //   Subscribe to changes in the contact list
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }

  ngOnDestroy(): void {
    //   Prevent memory leaks
    this.subscription.unsubscribe();
  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.next(contact);
    this.router.navigate(['/contacts', contact.id]);
  }

  search(value: string) {
    this.term = value;
  }
}


