import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {setRoomValue} from '../redux/room'
import { useLocation } from "react-router-dom";
function ChatWebSocket({cableApp}) {
    const dispatch = useDispatch();
     const currentUser = useSelector(state=> state.user.value)
    const location = useLocation();
    const getRoomData = (id) => {
        fetch(`http://localhost:3000/rooms/${id}`)
        .then(response => response.json())
        .then(result => {
            dispatch(setRoomValue({
              room: result.data,
              users: result.data.attributes.users,
              messages: result.data.attributes.messages
          }))
        })
      }
      const updateApp = (newRoom) => {
        dispatch(setRoomValue({
            room: newRoom.room.data,
            users: newRoom.users,
            messages: newRoom.messages
          }));
      }
    useEffect(() => {
      console.log(location)
        getRoomData(window.location.href.match(/\d+$/)[0])
        cableApp.room = cableApp.cable.subscriptions.create({
            channel: 'RoomsChannel',
            room: window.location.href.match(/\d+$/)[0],
            user: currentUser.id,
        }, 
        {
            received: (updatedRoom) => {
                console.log("updatedRoom",updatedRoom);
                updateApp(updatedRoom)
            }
        })
        //cableApp.room.perform("appear");
    }, [location])
    
  return (
    <div></div>
  )
}

export default ChatWebSocket