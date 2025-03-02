// import { Injectable, EventEmitter } from '@angular/core';
// import { Document } from './document.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
// import { Subject } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class DocumentService {
//   documents: Document[] = [];
//   documentSelectedEvent = new EventEmitter<Document>();
//   documentChangedEvent = new EventEmitter<Document[]>();


//   constructor() {
//     this.documents = MOCKDOCUMENTS;
//     console.log('Documents Loaded:', this.documents);
//   }

//   getDocuments(): Document[] {
//     console.log('Documents Loaded:', this.documents);
//     return this.documents.slice();

//   }

//   getDocument(id: string): Document {
//     return this.documents.find(document => document.id === id) || null;
//   }

//   deleteDocument(document: Document) {
//     if (!document) return;
//     const pos = this.documents.indexOf(document);
//     if (pos < 0) return;
//     this.documents.splice(pos, 1);
//     this.documentChangedEvent.emit(this.documents.slice());
//   }
  
// }

import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number = 0; // ✅ Declare maxDocumentId here

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId(); // ✅ Now this works
    console.log('Documents Loaded:', this.documents);
  }

  getDocuments(): Document[] {
    console.log('Documents Loaded:', this.documents);
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find(document => document.id === id) || null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();

    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice()); // ✅ Use .next() instead of emit()
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice()); // ✅ Use .next()
  }

  deleteDocument(document: Document) {
    if (!document) return;

    const pos = this.documents.indexOf(document);
    if (pos < 0) return;

    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice()); // ✅ Use .next()
  }
}
