import { Component, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  standalone: false,
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
})
export class MessageItemComponent {
  @Input() message!: Message; // Add this line to bind the message data passed from the parent component
}

