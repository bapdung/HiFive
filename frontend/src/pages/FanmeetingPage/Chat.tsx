import React, { useEffect, useRef } from "react";

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
}) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div
      id="chat-container"
      className="col-md-12 z-10 p-2 bg-meetingroom-100 h-[409px] rounded-2xl flex flex-col"
    >
      <div
        id="chat-box"
        ref={chatBoxRef}
        className="flex-grow overflow-y-auto p-1 pr-1.5 mb-1.5 rounded-lg custom-scrollbar"
      >
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.isCreator
                ? "bg-meetingroom-200 font-semibold py-0.5 px-2 mt-1.5 rounded break-words"
                : "bg-white rounded py-0.5 px-2 mt-1.5 break-words"
            }
          >
            <strong
              style={{ color: userColors[msg.user] }}
              className="text-small"
            >
              {msg.user}
            </strong>{" "}
            <span className="text-small">{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex text-small px-[1px]">
        <input
          type="text"
          value={newMessage}
          onChange={handleChangeMessage}
          placeholder="메시지를 입력하세요"
          className="flex-grow p-2 border rounded-l-xl outline-none"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-meetingroom-500 text-white rounded-r-xl hover:bg-meetingroom-600"
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default Chat;
