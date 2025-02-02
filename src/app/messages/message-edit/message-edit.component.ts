import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
  standalone: false,
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
})
export class MessageEditComponent {
  @ViewChild('subject') subjectRef!: ElementRef;
  @ViewChild('msgText') msgTextRef!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage() {
    const newMessage = new Message(
      Math.random().toString(),
      this.subjectRef.nativeElement.value,
      this.msgTextRef.nativeElement.value,
      'Current User'
    );
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
