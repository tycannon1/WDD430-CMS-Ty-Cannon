import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new Subject<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number = 0;

  //   Replace with your Firebase URL (with /contacts.json at the end)
  private firebaseUrl: string = 'https://cms2025-88a1f-default-rtdb.firebaseio.com/contacts.json';

  constructor(private http: HttpClient) {}

  //   Get Contacts from Firebase
  getContacts(): void {
    this.http.get<Contact[]>(this.firebaseUrl)
      .subscribe(
        (contacts: Contact[]) => {
          if (!contacts) {
            this.contacts = [];
          } else {
            this.contacts = contacts;
          }

          this.maxContactId = this.getMaxId();
          this.sortContacts();
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Failed to fetch contacts:', error);
        }
      );
  }

  getContact(id: string): Contact {
    return this.contacts.find(contact => contact.id === id) || null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  //   Add Contact and Push to Firebase
  addContact(newContact: Contact) {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    this.storeContacts(); //   Save to Firebase
  }

  //   Update Contact in Firebase
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    this.storeContacts(); //   Save to Firebase
  }

  //   Delete Contact from Firebase
  deleteContact(contact: Contact) {
    if (!contact) return;

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;

    this.contacts.splice(pos, 1);

    this.storeContacts(); //   Save to Firebase
  }

  //   Send Data to Firebase (PUT Request)
  storeContacts(): void {
    this.http.put(this.firebaseUrl, this.contacts)
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  //   Sort contacts alphabetically
  private sortContacts(): void {
    this.contacts.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);
  }
}

