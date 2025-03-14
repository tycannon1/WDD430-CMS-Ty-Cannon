import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message.model';
import { Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private subscription: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    //   Call getMessages() to trigger Firebase request
    this.messageService.getMessages();

    //   Subscribe to the event for real-time updates
    this.subscription = this.messageService.messageChangedEvent
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      });
  }

  // Prevent memory leaks
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Handle new message being added
  onAddMessage(message: Message) {
    console.log('New message added:', message);
    this.messageService.addMessage(message);
  }
}


