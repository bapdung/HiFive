// src/service/websocket.ts
type Listener = (data: any) => void;

class WebSocketService {
  private url: string;

  private socket: WebSocket | null;

  private listeners: { [event: string]: Listener[] };

  constructor(url: string) {
    this.url = url;
    this.socket = null;
    this.listeners = {};
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.notifyListeners(data);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket Disconnected");
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  }

  addListener(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  removeListener(event: string, callback: Listener) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  private notifyListeners(data: any) {
    const listeners = this.listeners[data.event];
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }
}

const webSocketService = new WebSocketService("ws://localhost:8080/ws/ticket");
export default webSocketService;
