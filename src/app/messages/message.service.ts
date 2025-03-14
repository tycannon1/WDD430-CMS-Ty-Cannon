import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();

  //   Replace with your Firebase URL (with /messages.json)
  private firebaseUrl: string = 'https://cms2025-88a1f-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {}

  //   Fetch Messages from Firebase
  getMessages(): void {
    this.http.get<Message[]>(this.firebaseUrl)
      .subscribe(
        (messages: Message[]) => {
          if (!messages) {
            this.messages = [];
          } else {
            this.messages = messages;
          }
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.error('Failed to fetch messages:', error);
        }
      );
  }

  //   Get a single message by ID
  getMessage(id: string): Message {
    return this.messages.find(message => message.id === id) || null;
  }

  //   Add a new message and save it to Firebase
  addMessage(message: Message): void {
    this.messages.push(message);
    this.storeMessages(); //   Save to Firebase
  }

  //   Save all messages to Firebase
  storeMessages(): void {
    this.http.put(this.firebaseUrl, this.messages)
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}


