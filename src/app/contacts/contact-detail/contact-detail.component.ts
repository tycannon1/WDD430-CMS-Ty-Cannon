// import { Component, OnInit } from '@angular/core';
// import { Contact } from '../contact.model';
// import { ContactService } from '../contact.service';
// import { Router } from '@angular/router';

// @Component({
//   standalone: false,
//   selector: 'cms-contact-detail',
//   templateUrl: './contact-detail.component.html',
//   styleUrls: ['./contact-detail.component.css']
// })
// export class ContactDetailComponent implements OnInit {
//   selectedContact: Contact | null = null; // Now using service to get selected contact


//   constructor(private contactService: ContactService, private router: Router) {} // Inject ContactService

//   ngOnInit(): void {
//     this.contactService.contactSelectedEvent.subscribe(
//       (contact: Contact) => {
//         this.selectedContact = contact; // Update when a contact is selected
//       }
//     );
//   }
//   onDelete() {
//     this.contactService.deleteContact(this.selectedContact);
//     this.router.navigate(['/contacts']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';

@Component({
  standalone: false,
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contact = this.contactService.getContact(params['id']);
    });
  }
  onDelete() {
    if (!this.contact) return; 
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }
}


