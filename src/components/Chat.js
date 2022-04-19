import { React, useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import ChatWebSocket from "./ChatWebSocket";
import StatusWebSocket from "./StatusWebSocket";
import Message from "./Message";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

import InputEmoji from "react-input-emoji";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const Chat = ({ cableApp }) => {
  const [messagePlaceHolder, setMessagePlaceHolder] =
    useState("Type a message...");
  const [isListening, setIsListening] = useState(false);

  const [seed, setSeed] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const currentRoom = useSelector((state) => state.room.value);
  const currentUser = useSelector((state) => state.user.value);
  const [userMenu, setUserMenu] = useState(false);

  const [text, setText] = useState("");

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNewMessage(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSubmit = () => {
    const message = {
      content: newMessage,
      user_id: currentUser.id,
      room_id: parseInt(currentRoom.room.id),
    };
    console.log("message", message);
    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message: message }),
    })
      .then((resp) => resp.json())
      .then((result) => {});
  };
  function handelShowUsers() {
    if (userMenu == false) {
      setUserMenu(true);
    } else {
      setUserMenu(false);
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
          <IconButton onClick={handelShowUsers}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      {userMenu ? <UserMenu /> : null}
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
        <IconButton onClick={() => setIsListening((prevState) => !prevState)}>
          <MicIcon color={isListening ? "success" : "disabled"} />
        </IconButton>

        <form>
          <InputEmoji
            // value={text}
            // onChange={setText}====
            cleanOnEnter
            onEnter={() => handleSubmit()}
            // placeholder="Type a message"
            placeholder={isListening ? "Listening..." : "Type a message..."}
            type="text"
            value={newMessage}
            onChange={setNewMessage}
          />
          {/* <input
            placeholder={isListening ? "Listening..." : "Type a message..."}
            type="text"
            value={newMessage}
            onChange={(e) => handleChange(e)}
          /> */}
          {/* <button>Send a message</button> */}
        </form>

        <ChatWebSocket cableApp={cableApp} />
        {/* <StatusWebSocket cableApp={cableApp}/> */}
      </div>
    </div>
  );
};

export default Chat;
