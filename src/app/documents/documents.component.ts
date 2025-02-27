import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';
import { Document } from './document.model';

@Component({
  standalone: false,
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents: Document[] = [];
  selectedDocument: Document | null = null;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }

  onSelectedDocument(document: Document) {
    this.selectedDocument = document;
  }
}


