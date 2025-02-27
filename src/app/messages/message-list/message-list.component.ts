import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message.model';

@Component({
  standalone: false,
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  // Add this method inside the class
  onAddMessage(message: Message) {
    console.log('New message added:', message);
    this.messages.push(message); // Update the message list
  }
}



