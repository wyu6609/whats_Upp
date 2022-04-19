import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

function UserMenuCard({m}) {
    const [seed, setSeed] = useState("");
    useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
    }, []);
  return (
    <div className='user-menu-card'>
    <div className="sidebarChat-info">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <h2>{m.attributes.username}</h2>
      <p>{m.attributes.online}</p>
    </div>
    </div>
  )
}

export default UserMenuCard