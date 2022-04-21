import React, { useState } from "react";

import { useSelector} from 'react-redux'
import UserMenuCard from "./UserMenuCard"
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
  return (
    <div className="chat-header">
    {currentRoom.users.data.map((m)=>{
        return (<UserMenuCard key={m.id} m={m}/>)
    })}
    <button onClick={()=>handleClick()}>Add A Member</button>
    {addMemberToggle? <form onSubmit={(e)=>handleSubmit(e)}>
      <input type="text" name="name" value={textField} onChange={(e)=>handleChange(e)} placeholder="Username"></input>
    </form>
    :null}
    <button onClick={() => handleDelete()}>Leave Room</button>
    </div>
  )
}

export default UserMenu