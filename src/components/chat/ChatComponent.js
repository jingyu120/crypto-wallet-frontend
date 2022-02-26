import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import JoinChat from "./JoinChat";
import "./ChatComponent.css";

const socket = io.connect(`${process.env.REACT_APP_BASEURL}/`);

export default function ChatComponent() {
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("general");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="chat-container">
      {!showChat ? (
        <JoinChat
          room={room}
          setUsername={setUsername}
          setRoom={setRoom}
          joinRoom={joinRoom}
        />
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}
