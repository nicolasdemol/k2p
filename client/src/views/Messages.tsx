import { useState, useEffect } from "react";
import { ChatContainer } from "@/components/messages/chat-container";
import { Contacts } from "@/components/messages/chat-contacts";
import { Welcome } from "@/components/messages/chat-welcome";
import { api } from "@/services/api";
import socket from "@/services/socket";
import { useAuth } from "@/hooks/useAuth";

export default function MessagePage() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (user) {
        await api
          .getAllUsers()
          .then(({ users }) =>
            setContacts(users.filter((userL) => userL._id !== user.userId))
          );
      }
    };
    fetchAllUsers();
  }, [user]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  
  return (
    <div className="w-full max-w-screen-lg flex mx-auto items-center h-[calc(100vh-70px)]">
      <div
        className="grid w-full h-5/6 rounded-xl border border-gray-50 shadow-xl overflow-hidden"
        style={{ gridTemplateColumns: "25% 75%" }}
      >
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
}
