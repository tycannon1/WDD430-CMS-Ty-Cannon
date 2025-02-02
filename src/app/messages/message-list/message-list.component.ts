import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  standalone: false,
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'Meeting Reminder', 'Don’t forget our meeting at 2PM.', 'John Doe'),
    new Message('2', 'Homework Help', 'Can you help me with Angular?', 'Jane Smith'),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}

