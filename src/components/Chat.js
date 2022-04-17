import { React, useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import ChatWebSocket from './ChatWebSocket'
import Message from './Message'
import { useSelector } from 'react-redux'
const Chat = ({cableApp}) => {
  const [seed, setSeed] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const currentRoom = useSelector((state)=> state.room.value)
  const currentUser = useSelector((state)=> state.user.value)
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const handleChange = (e)=>{
    setNewMessage(e.target.value);
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    const message = {
      content: newMessage,
      user_id: currentUser.id,
      room_id: parseInt(currentRoom.room.id)
  }
  fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({message: message})
        })
        .then(resp => resp.json())
        .then(result => {
            
        })
  }
  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat-headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {currentRoom.messages.map((m)=>{
        return (<Message key={m.id} m={m} />);
        })}
      </div>

      <div className="chat-footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <form onSubmit={(e)=>handleSubmit(e)}>
          <input placeholder="Type a message..." type="text" value={newMessage} onChange={(e)=>handleChange(e)} />
          <button>Send a message</button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
      <ChatWebSocket cableApp={cableApp}/>
    </div>
  );
};

export default Chat;
