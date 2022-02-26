import React, { useState } from "react";
import ChatComponent from "../chat/ChatComponent";
import CryptoComponent from "../crypto/CryptoComponent";
import "./Home.css";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  return (
    <div>
      <CryptoComponent />
      <button className="chat-toggle" onClick={() => setShowChat(!showChat)}>
        {showChat ? "Close" : "Show"} Chat
      </button>
      {showChat && <ChatComponent />}
    </div>
  );
}
