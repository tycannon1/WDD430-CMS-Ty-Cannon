// import { Component, Input } from '@angular/core';
// import { Document } from '../document.model';
// import { DocumentService } from '../document.service';
// import { Router } from '@angular/router';
// import { WindRefService } from '../../wind-ref.service'; // Import WindRefService

// @Component({
//   standalone: false,
//   selector: 'cms-document-detail',
//   templateUrl: './document-detail.component.html',
//   styleUrls: ['./document-detail.component.css']
// })
// export class DocumentDetailComponent {
//   @Input() document: Document;
//   nativeWindow: any;

//   constructor(
//     private documentService: DocumentService,
//     private router: Router,
//     private winRef: WindRefService // Inject WindRefService
//   ) {
//     this.nativeWindow = this.winRef.getNativeWindow(); // Get window reference
//   }

//   onDelete() {
//     this.documentService.deleteDocument(this.document);
//     this.router.navigate(['/documents']);
//   }

//   onView() {
//     if (this.document?.url) {
//       this.nativeWindow.open(this.document.url);
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { WindRefService } from '../../wind-ref.service';

@Component({
  standalone: false,
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private winRef: WindRefService
  ) {
    this.nativeWindow = this.winRef.getNativeWindow();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.document = this.documentService.getDocument(params['id']);
    });
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

  onView() {
    if (this.document?.url) {
      this.nativeWindow.open(this.document.url);
    }
  }
}

