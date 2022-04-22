import React, { useState } from "react";

import { useSelector} from 'react-redux'
import UserMenuCard from "./UserMenuCard"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import './UserMenu.css'
function UserMenu() {
    const currentRoom = useSelector((state)=> state.room.value)
    const currentUser = useSelector((state)=> state.user.value)
    const [addMemberToggle, setAddMemberToggle] = useState(false);
    const [textField, setTextField] = useState('');
    function handleDelete(){
      fetch('http://localhost:3000/leave',{
        method:'POST',
        headers: {
          'Content-Type':'application/json',
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          room_id: parseInt(currentRoom.room.id),
        })
        })
    }
    function handleChange(e) {
      setTextField(e.target.value);
    }
    function handleClick(){
      if(addMemberToggle === false){
        setAddMemberToggle(true)
      }else{
        setAddMemberToggle(false)
      }
    }
    function handleSubmit(e){
      e.preventDefault();
      handleClick();
      fetch("http://localhost:3000/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: textField,
          room_id: currentRoom.room.id
        }),
      })
      .then(response =>response.json())
      .then(data => {
        console.log(data)
      })
    }
    const styleForButton = {
      'font-size': '25px',
      'margin-left': '20px',
    };
  return (
    <div className="chat-header-wow">
    <div className="chat-header-menu">

    {currentRoom.users.data.map((m)=>{
        return (<UserMenuCard key={m.id} m={m}/>)
    })}
    </div>
    <div className="chat-header-menu">
    {addMemberToggle?null:<IconButton  onClick={()=>handleClick()}>
    <GroupAddIcon style={styleForButton}/>
    </IconButton>
    }
    {addMemberToggle? <form className='user-input-field' onSubmit={(e)=>handleSubmit(e)}>
      <input className='user-input' type="text" name="name" value={textField} onChange={(e)=>handleChange(e)} placeholder="Username"></input>
    </form>
    :null}
    <IconButton  onClick={()=>handleDelete()}>
    <ExitToAppIcon style={styleForButton}/>
    </IconButton>
    </div>
    </div>
  )
}

export default UserMenu