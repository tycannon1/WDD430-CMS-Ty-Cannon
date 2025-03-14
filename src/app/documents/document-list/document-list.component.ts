import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  standalone: false,
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  selectedDocument: Document | null = null;
  private subscription: Subscription; // Stores the subscription

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    //   Call getDocuments() but don't assign it directly
    this.documentService.getDocuments(); // This triggers the HTTP request

    //   Subscribe to the event when data is fetched
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        console.log('Updated Documents:', this.documents);
      });
  }

  //   Unsubscribe to avoid memory leaks
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  //   Handle document selection
  onSelectedDocument(document: Document): void {
    this.selectedDocument = document;
    console.log('Selected Document:', this.selectedDocument);
  }
}


