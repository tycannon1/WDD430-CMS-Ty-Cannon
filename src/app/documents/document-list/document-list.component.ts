// import { Component, OnInit } from '@angular/core';
// import { Document } from '../document.model';
// import { DocumentService } from '../document.service';

// @Component({
//   standalone: false,
//   selector: 'cms-document-list',
//   templateUrl: './document-list.component.html',
//   styleUrls: ['./document-list.component.css']
// })
// export class DocumentListComponent implements OnInit {
//   documents: Document[] = [];

//   constructor(private documentService: DocumentService) {}

//   ngOnInit(): void {
//     this.documents = this.documentService.getDocuments();
//     console.log('Documents in List:', this.documents);
  
//     this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
//       this.documents = documents;
//       console.log('Updated Documents:', this.documents);
//     });
  
//     // Subscribe to selected document
//     this.documentService.documentSelectedEvent.subscribe((document: Document) => {
//       this.selectedDocument = document;
//       console.log('Selected Document:', this.selectedDocument);
//     });
//   }
  

//   selectedDocument: Document | null = null;

//   onSelectedDocument(document: Document) {
//     this.documentService.documentSelectedEvent.emit(document);
//   }
// }

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
    this.documents = this.documentService.getDocuments();
    console.log('Documents in List:', this.documents);

    // Subscribe to documentListChangedEvent
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        console.log('Updated Documents:', this.documents);
      }
    );
  }

  // Unsubscribe to avoid memory leaks
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Selecting a document (now just assigns without emitting)
  onSelectedDocument(document: Document): void {
    this.selectedDocument = document;
    console.log('Selected Document:', this.selectedDocument);
  }
}

