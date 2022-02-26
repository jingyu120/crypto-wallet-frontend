import React from "react";
import "./JoinChat.css";

export default function JoinChat({ setUsername, room, setRoom, joinRoom }) {
  return (
    <div className="joinChatContainer">
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        onKeyPress={(event) => event.key === "Enter" && joinRoom()}
      />
      <select
        value={room}
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      >
        <option value="general">General</option>
        <option value="room1">Room 1</option>
        <option value="room2">Room 2</option>
        <option value="room3">Room 3</option>
        <option value="room4">Room 4</option>
        <option value="room5">Room 5</option>
        <option value="room6">Room 6</option>
      </select>
      <button onClick={joinRoom}>Join a Room</button>
    </div>
  );
}
