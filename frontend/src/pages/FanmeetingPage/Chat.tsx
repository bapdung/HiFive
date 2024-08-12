// import React, { useEffect, useState } from "react";

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
  <div id="chat-container" className="col-md-12">
    <h3>채팅</h3>
    <div id="chat-box">
      {chatMessages.map((msg) => (
        <div key={msg.id} className={msg.isCreator ? "bg-primary-300" : ""}>
          <strong style={{ color: userColors[msg.user] }}>{msg.user}:</strong>{" "}
          {msg.text}
        </div>
      ))}
    </div>
    <form onSubmit={handleSendMessage}>
      <input
        type="text"
        value={newMessage}
        onChange={handleChangeMessage}
        placeholder="메시지를 입력하세요"
      />
      <button type="submit">전송</button>
    </form>
  </div>
);

export default Chat;
