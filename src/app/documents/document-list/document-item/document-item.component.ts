import { Component, Input } from '@angular/core';
import { Document } from '../../document.model';
import { DocumentService } from '../../document.service';

@Component({
  standalone: false,
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent {
  @Input() document: Document;

  constructor(private documentService: DocumentService) {}

  onSelectDocument() {
    this.documentService.documentSelectedEvent.emit(this.document);
  }
}


