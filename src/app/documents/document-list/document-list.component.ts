import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  standalone: false,
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    console.log('Documents in List:', this.documents);
  
    this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
      console.log('Updated Documents:', this.documents);
    });
  
    // Subscribe to selected document
    this.documentService.documentSelectedEvent.subscribe((document: Document) => {
      this.selectedDocument = document;
      console.log('Selected Document:', this.selectedDocument);
    });
  }
  

  selectedDocument: Document | null = null;

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }
}


