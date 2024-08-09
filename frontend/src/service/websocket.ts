// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  connect(memberId: string, fanmeetingId: string) {
    this.socket = new WebSocket(
      `${this.url}/${fanmeetingId}?memberId=${memberId}`,
    );

    this.socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    this.socket.onmessage = (event) => {
      console.log("Raw WebSocket Message Received:", event.data);

      const data = JSON.parse(event.data);
      // console.log("WebSocket Message Received:", data);
      this.notifyListeners(data);
    };

    this.socket.onerror = () => {
      // console.error("WebSocket Error: ", error);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private notifyListeners(data: any) {
    const listeners = this.listeners[data.event];
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }
}

const webSocketService = new WebSocketService(
  "wss://i11a107.p.ssafy.io/ws/ticket",
  // "ws://localhost:8080/ws/ticket",
);
export default webSocketService;
