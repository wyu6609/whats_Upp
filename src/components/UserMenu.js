import React, { useEffect, useState } from "react";

import { useSelector} from 'react-redux'
import UserMenuCard from "./UserMenuCard"
function UserMenu() {
    const currentRoom = useSelector((state)=> state.room.value)
  return (
    <div className="chat-header">
    {currentRoom.users.data.map((m)=>{
        return (<UserMenuCard m={m}/>)
    })}
    </div>
  )
}

export default UserMenu