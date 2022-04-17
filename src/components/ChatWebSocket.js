import React,{useEffect} from 'react'
import {useDispatch } from 'react-redux'
import {setValue} from '../redux/room'
function ChatWebSocket({cableApp}) {
    const dispatch = useDispatch();
    const getRoomData = (id) => {
        fetch(`http://localhost:3000/rooms/${id}`)
        .then(response => response.json())
        .then(result => {
            dispatch(setValue({
              room: result.data,
              users: result.data.attributes.users,
              messages: result.data.attributes.messages
          }))
        })
      }
      const updateApp = (newRoom) => {
        dispatch(setValue({
            room: newRoom.room.data,
            users: newRoom.users,
            messages: newRoom.messages
          }));
      }
    useEffect(() => {
        getRoomData(window.location.href.match(/\d+$/)[0])
        cableApp.room = cableApp.cable.subscriptions.create({
            channel: 'RoomsChannel',
            room: window.location.href.match(/\d+$/)[0]
        }, 
        {
            received: (updatedRoom) => {
                console.log("updatedRoom",updatedRoom);
                updateApp(updatedRoom)
            }
        })
    }, [])
    
  return (
    <div></div>
  )
}

export default ChatWebSocket