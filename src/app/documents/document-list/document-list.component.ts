import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  standalone: false,
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  documents: Document[] = [
    new Document('1', 'Document 1', 'Description of Document 1', 'url1.com', []),
    new Document('2', 'Document 2', 'Description of Document 2', 'url2.com', []),
    new Document('3', 'Document 3', 'Description of Document 3', 'url3.com', []),
    new Document('4', 'Document 4', 'Description of Document 4', 'url4.com', [])
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  selectedDocument: Document | null = null;

  onSelectedDocument(document: Document) {
    this.selectedDocument = document;
    this.selectedDocumentEvent.emit(document);
  }
}

