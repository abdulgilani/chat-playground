import { useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

const ChatContainer = () => {
  const { messages } = useChatStore();

  const { authUser } = useAuthStore();
  const messageRef = useRef(null);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <ChatInput />
    </div>
  );
};

export default ChatContainer;
