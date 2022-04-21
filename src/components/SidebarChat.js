import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./SidebarChat.css";
import {Link } from "react-router-dom";
const SidebarChat = ({ addNewChat, room, openChat,handleClick }) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      // do some database stuff...
    }
  };
  return !addNewChat ? (
  
    <div className="sidebarChat no-select" onClick={()=>openChat(room)}>
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat-info">
        <h2>{room.name}</h2>
        <p>{room.description}</p>
      </div>
    </div>
  ) : (
    <div onClick={()=>handleClick()} className="sidebarChat no-select">
      <h2>Add new Chat</h2>
    </div>
  );
};

export default SidebarChat;
