import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Connect to backend
    this.socket = io('http://localhost:3000');
  }

  // Listen for chat messages
  onMessage(callback: (msg: string) => void) {
    this.socket.on('chat message', callback);
  }

  // Send chat message
  sendMessage(msg: string) {
    this.socket.emit('chat message', msg);
  }
}
