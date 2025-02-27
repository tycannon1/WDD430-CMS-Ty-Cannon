// import { Component, ViewChild, ElementRef } from '@angular/core';
// import { MessageService } from '../message.service';
// import { Message } from '../message.model';

// @Component({
//   standalone: false,
//   selector: 'cms-message-edit',
//   templateUrl: './message-edit.component.html',
//   styleUrls: ['./message-edit.component.css']
// })
// export class MessageEditComponent {
//   @ViewChild('subjectInput') subjectRef!: ElementRef;
//   @ViewChild('msgTextInput') msgTextRef!: ElementRef;

//   constructor(private messageService: MessageService) {}

//   onSendMessage() {
//     const subject = this.subjectRef.nativeElement.value;
//     const msgText = this.msgTextRef.nativeElement.value;

//     if (!subject || !msgText) return; // Avoid sending empty messages

//     const newMessage = new Message('m6', subject, msgText, '2');
//     this.messageService.addMessage(newMessage);
//     this.onClear(); // Clear input fields after sending
//   }

//   onClear() {
//     this.subjectRef.nativeElement.value = '';
//     this.msgTextRef.nativeElement.value = '';
//   }
// }

import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message.model';

@Component({
  standalone: false,
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements AfterViewInit {
  @ViewChild('subject') subjectRef!: ElementRef;
  @ViewChild('msgText') msgTextRef!: ElementRef;

  constructor(private messageService: MessageService) {}

  ngAfterViewInit() {
    if (!this.subjectRef || !this.msgTextRef) {
      console.error('ViewChild elements not initialized!');
    }
  }

  onSendMessage() {
    if (!this.subjectRef || !this.msgTextRef) {
      console.error('Elements not found!');
      return;
    }

    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;

    if (!subject || !msgText) return;

    const newMessage = new Message('m6', subject, msgText, '2');
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    if (this.subjectRef && this.msgTextRef) {
      this.subjectRef.nativeElement.value = '';
      this.msgTextRef.nativeElement.value = '';
    }
  }
}


