
import React,{useState} from "react";
import "./Sidebar.css";
import { IconButton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SidebarChat from "./SidebarChat";
import { useSelector, useDispatch } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const Sidebar = ({ usersRooms, openChat ,fetchProfile}) => {
  const [newChatform, setNewChatform] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDesc, setRoomDesc] = useState("");
  const currentUser = useSelector((state) => state.user.value);
  const [chatroomSearch, setChatRoomSearch] = useState("");
  const searchBarHandler_chatroom = (event) => {
    setChatRoomSearch(event.target.value);
  };
  let filteredChatRoom = usersRooms.filter((chatroom) => {
    if (chatroom.name.toLowerCase().includes(chatroomSearch.toLowerCase())) {
      return chatroom;
    } else if (chatroomSearch == "") {
      return chatroom;
    }
  });
  function handleClick(){
    if(newChatform === false){
      setNewChatform(true)
    }else{
      setNewChatform(false)
    }
  }
  function handleChange(e){
    if (e.target.name === "room") {
      setRoomName(e.target.value);
    } else {
      setRoomDesc(e.target.value);
    }
  }
  function handleSubmit(e){
    e.preventDefault();
    fetch("http://localhost:3000/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: roomName,
        description: roomDesc,
        user_id: currentUser.id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewChatform(false);
        fetchProfile();
      });
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src="/whatsapp_icon.png" alt="whatsapp_logo" />
        <div
          className="sidebar-header-right"
          onClick={() => console.log("log out user")}
        >
          <IconButton>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-searchContainer">
          <SearchIcon />
          <input
            placeholder="Search chat"
            type="text"
            onChange={searchBarHandler_chatroom}
          />
        </div>
      </div>
      <div className="sidebar-chats">

        <SidebarChat addNewChat handleClick={handleClick}/>
        {newChatform? <div className="sidebarChat no-select">
          <form onSubmit={(e)=>handleSubmit(e)}>
          <input type="text" name="room" value={roomName} onChange={(e)=>handleChange(e)} placeholder="Room Name"></input>
          <input type="text" name="desc" value={roomDesc} onChange={(e)=>handleChange(e)} placeholder="Room Description"></input>
          <button>CREATE</button>
          </form>
        </div>:null}
        {filteredChatRoom.map((room) => {
          return <SidebarChat key={room.id} room={room} openChat={openChat} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
