import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoSendOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import s from "./chat-input.module.css";

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  const input = useRef();

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
    input.current.textContent = "";
    setIsPlaceholderVisible(true);
  };

  const handleContentChange = (event) => {
    const content = event.target.textContent;
    setIsPlaceholderVisible(content === "");
    setMsg(content);
  };

  return (
    <form
      onSubmit={(event) => sendChat(event)}
      style={{ gridTemplateColumns: "80% 20%" }}
      className="absolute text-black bottom-4 grid items-end gap-4 w-full px-10"
    >
      <div
        id="message"
        ref={input}
        contentEditable="true"
        className={cn(
          "outline-none py-2 break-words px-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg ring-2 ring-transparent hover:ring-gray-200 focus:ring-gray-200 transition-all duration-300",
          { [s.placeholder]: isPlaceholderVisible }
        )}
        onInput={handleContentChange}
      ></div>

      <Button size="sm" variant="outline" type="submit">
        <IoSendOutline className="mr-2" size={18} />
        Envoyer
      </Button>
    </form>
  );
};

export { ChatInput };
