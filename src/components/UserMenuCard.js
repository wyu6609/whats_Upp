import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

function UserMenuCard() {
    const [seed, setSeed] = useState("");

    useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
    }, []);
  return (
    <>
    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
    <div className="sidebarChat-info">
      <h2>username</h2>
      <p>online</p>
    </div>
    </>
  )
}

export default UserMenuCard