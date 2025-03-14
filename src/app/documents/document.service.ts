import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number = 0;

  //   This is the CORRECT URL for your Firebase database (with .json)
  private firebaseUrl: string = 'https://cms2025-88a1f-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) {}

  getDocuments(): void {
    //   Make a GET request to Firebase
    this.http.get<Document[]>(this.firebaseUrl)
      .subscribe(
        (documents: Document[]) => {
          if (!documents) {
            this.documents = [];
          } else {
            this.documents = documents;
          }

          this.maxDocumentId = this.getMaxId();
          this.sortDocuments();
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Failed to fetch documents:', error);
        }
      );
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

    this.storeDocuments(); //   Save to Firebase
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;

    this.storeDocuments(); //   Save to Firebase
  }

  deleteDocument(document: Document) {
    if (!document) return;

    const pos = this.documents.indexOf(document);
    if (pos < 0) return;

    this.documents.splice(pos, 1);

    this.storeDocuments(); //   Save to Firebase
  }

  //   Store documents in Firebase using PUT request
  storeDocuments(): void {
    this.http.put(this.firebaseUrl, this.documents)
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  //   Sort documents by name
  sortDocuments(): void {
    this.documents.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
  }
}
