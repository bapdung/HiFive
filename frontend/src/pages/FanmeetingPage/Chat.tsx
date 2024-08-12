import React from "react";

interface ChatMessage {
  isCreator: boolean;
  id: string;
  user: string;
  text: string;
}

interface ChatProps {
  chatMessages: ChatMessage[];
  newMessage: string;
  handleChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  userColors: { [key: string]: string };
}

const Chat: React.FC<ChatProps> = ({
  chatMessages,
  newMessage,
  handleChangeMessage,
  handleSendMessage,
  userColors,
}) => (
  <div
    id="chat-container"
    className="col-md-12 z-10 p-2 bg-meetingroom-100 h-[409px] rounded-2xl flex flex-col"
  >
    <div
      id="chat-box"
      className="flex-grow overflow-y-auto bg-white p-2 mb-2 rounded-lg"
    >
      {chatMessages.map((msg) => (
        <div
          key={msg.id}
          className={
            msg.isCreator
              ? "bg-meetingroom-200 bg-opacity-70 p-1 rounded"
              : "p-1"
          }
        >
          <strong style={{ color: userColors[msg.user] }}>{msg.user}:</strong>{" "}
          {msg.text}
        </div>
      ))}
    </div>
    <form onSubmit={handleSendMessage} className="flex">
      <input
        type="text"
        value={newMessage}
        onChange={handleChangeMessage}
        placeholder="메시지를 입력하세요"
        className="flex-grow p-2 border rounded-l-xl"
      />
      <button
        type="submit"
        className="p-2 bg-meetingroom-500 text-white rounded-r-xl hover:bg-meetingroom-600"
      >
        전송
      </button>
    </form>
  </div>
);

export default Chat;
