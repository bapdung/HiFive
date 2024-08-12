// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listener = (data: any) => void;

class WebSocketService {
  private url: string;

  private socket: WebSocket | null = null;

  private listeners: { [event: string]: Listener[] };

  constructor(url: string) {
    this.url = url;
    this.socket = null;
    this.listeners = {};
  }

  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  connect(memberId: string, fanmeetingId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected()) {
        console.log("WebSocket is already connected.");
        resolve();
        return;
      }

      this.socket = new WebSocket(
        `${this.url}/${fanmeetingId}?memberId=${memberId}`,
      );

      this.socket.onopen = () => {
        console.log("WebSocket Connected");
        resolve();
      };

      this.socket.onmessage = (event) => {
        console.log("Raw WebSocket Message Received:", event.data);

        const data = JSON.parse(event.data);

        if (data.event === "alreadyConnected") {
          console.log("Already connected. Disconnecting WebSocket.");
          this.disconnect();
        }

        this.notifyListeners(data);
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket Error: ", error);
        reject(error);
      };

      this.socket.onclose = () => {
        console.log("WebSocket Disconnected");
        this.socket = null;
      };
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
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
