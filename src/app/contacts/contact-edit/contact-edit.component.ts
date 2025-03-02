import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  standalone: false,
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact;
  originalContact: Contact;
  editMode = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(id);
      if (!this.originalContact) return;

      this.editMode = true;
      this.contact = { ...this.originalContact }; // Clone for editing
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const newContact = new Contact(
      this.contact?.id || '',
      form.value.name,
      form.value.email,
      form.value.phone,
      form.value.imagePath,
      []
    );

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
