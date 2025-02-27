import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  standalone: false,
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact | null = null;
  contactId!: string;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contactId = params['id'];
      if (this.contactId) {
        this.contact = this.contactService.getContact(this.contactId);
      }
    });
  }

  onSave() {
    // Logic for saving the contact (either update or create)
    this.router.navigate(['/contacts']); // Navigate back after saving
  }

  onCancel() {
    this.router.navigate(['/contacts']); // Navigate back without saving
  }
}

