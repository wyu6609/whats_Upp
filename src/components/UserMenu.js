import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import UserMenuCard from "./UserMenuCard"
function UserMenu() {
    const [seed, setSeed] = useState("");

    useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
    }, []);
  return (
    <div className="chat-header">
        <UserMenuCard className="user-menu-card"/>
        <UserMenuCard className="user-menu-card"/>
        <UserMenuCard className="user-menu-card"/>
        <UserMenuCard className="user-menu-card"/>
    </div>
  )
}

export default UserMenu