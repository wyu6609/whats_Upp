import React from "react";
import "./Sidebar.css";
import { IconButton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SidebarChat from "./SidebarChat";
import { useSelector, useDispatch } from 'react-redux'
const Sidebar = ({usersRooms, openChat}) => {
 
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar />
        <div className="sidebar-header-right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-searchContainer">
          <SearchIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar-chats">
      <SidebarChat addNewChat />
        {usersRooms.map(room=>{
          return (<SidebarChat key={room.id} room={room} openChat={openChat}/>)
        })}
      </div>
    </div>
  );
};

export default Sidebar;
