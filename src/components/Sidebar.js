import { React, useState } from "react";
import "./Sidebar.css";
import { IconButton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SidebarChat from "./SidebarChat";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = ({ usersRooms, openChat }) => {
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

  ///////////

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
        <SidebarChat addNewChat />
        {filteredChatRoom.map((room) => {
          return <SidebarChat key={room.id} room={room} openChat={openChat} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
