import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './socket-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('Angular Chat Client');
  messages = signal<string[]>([]);
  newMessage: string = '';   // <-- plain property for ngModel

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.onMessage((msg: string) => {
      this.messages.update(list => [...list, msg]);
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.socketService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
