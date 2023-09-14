import { useState } from "react";
import { ChatContainer } from "@/components/messages/chat-container";
import { Contacts } from "@/components/messages/chat-contacts";
import { Welcome } from "@/components/messages/chat-welcome";
import socket from "@/services/socket";
import { User } from "@/hooks/useAuth";

export default function MessagePage() {
  const [currentChat, setCurrentChat] = useState<User>();

  const handleChatChange = (chat: User) => {
    console.log(chat)
    setCurrentChat(chat);
  };

  return (
      <div
        className="h-[calc(100vh-70px)] grid w-full rounded-xl border border-gray-50 shadow-xl overflow-hidden"
        style={{ gridTemplateColumns: "25% 75%" }}
      >
        <Contacts changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
  );
}
