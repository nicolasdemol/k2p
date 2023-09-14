import { useState, useEffect, useRef } from "react";
import { api } from "@/services/api";
import { ChatInput } from "./chat-input";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import s from "./chat-container.module.css";

const ChatContainer = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const { user } = useAuth();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchMsg = async () => {
      await api
        .getMsg({
          from: user._id,
          to: currentChat._id,
        })
        .then(({ messages }) => setMessages(messages));
    };
    fetchMsg();
  }, [currentChat, user]);

  const handleSendMsg = async (msg) => {
    socket.emit("send-msg", {
      from: user._id,
      to: currentChat._id,
      msg,
    });
    await api.sendMsg({
      from: user._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket) {
      socket.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div
      className="grid relative overflow-hidden"
      style={{ gridTemplateRows: "90% 10%" }}
    >
      <div
        className={cn(
          s.messages,
          "flex flex-col overflow-auto  gap-4 px-4 py-8"
        )}
      >
        {messages &&
          messages.map((message, index) => {
            return (
              <div ref={scrollRef} key={index}>
                <div
                  className={`flex items-center ${
                    message.fromSelf ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={cn("break-words p-2 rounded-xl text-sm", {
                      "bg-gradient-to-br from-cyan-400 to-blue-500 text-white":
                        message.fromSelf,
                      "bg-gradient-to-br from-gray-50 to-gray-200":
                        !message.fromSelf,
                    })}
                  >
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export { ChatContainer };
