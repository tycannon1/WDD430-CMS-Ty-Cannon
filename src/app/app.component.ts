import { Component } from '@angular/core';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';


@Component({
  selector: 'cms-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cms';

  selectedFeature = 'documents';  // This will hold the current feature

  // This method switches the selected feature
  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
