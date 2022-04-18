import { React, useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import ChatWebSocket from './ChatWebSocket'
import StatusWebSocket from './StatusWebSocket'
import Message from './Message'
import { useSelector } from 'react-redux'
import UserMenu from './UserMenu'
const Chat = ({cableApp}) => {
  const [seed, setSeed] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const currentRoom = useSelector((state)=> state.room.value)
  const currentUser = useSelector((state)=> state.user.value)
  const [userMenu, setUserMenu] = useState(false);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      content: newMessage,
      user_id: currentUser.id,
      room_id: parseInt(currentRoom.room.id)
  }
  console.log("message",message);
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
  function handelShowUsers(){
    if(userMenu == false){
      setUserMenu(true)
    }else{
      setUserMenu(false)
    }
  }
  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-headerInfo">
          {/* <h3>{currentRoom.room.attributes.name}</h3> */}
          <p></p>
        </div>
        <div className="chat-headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon onClick={handelShowUsers}/>
          </IconButton>
        </div>
      </div>
      {userMenu ? <UserMenu/>: null}
      <div className="chat-body">
        {currentRoom.messages.map((m) => {
          if (m.user_id == currentUser.id) {
            return <Message key={m.id} m={m} sender={true} />;
          } else {
            return <Message key={m.id} m={m} sender={false} />;
          }
        })}
      </div>

      <div className="chat-footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="Type a message..."
            type="text"
            value={newMessage}
            onChange={(e) => handleChange(e)}
          />
          <button>Send a message</button>
        </form>
        <IconButton>
          <MicIcon onClick={console.log("clicked")} />
        </IconButton>
      <ChatWebSocket cableApp={cableApp}/>
      {/* <StatusWebSocket cableApp={cableApp}/> */}
    </div>
  );
};

export default Chat;
