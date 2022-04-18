import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../redux/user";
import { setRoomValue } from "../redux/room";
import { useNavigate } from "react-router-dom";
function App({ cableApp }) {
  const currentUser = useSelector((state) => state.user.value);
  let navigate = useNavigate();
  console.log(currentUser);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<ChatScreen cableApp={cableApp} />} />
      <Route
        exact
        path="/rooms/:id"
        element={
          currentUser ? <ChatScreen cableApp={cableApp} /> : navigate("/")
        }
      />
    </Routes>
  );
}
function ChatScreen({ cableApp }) {
  let navigate = useNavigate();
  const currentRoom = useSelector((state) => state.room.value);
  console.log(currentRoom);
  const [usersRooms, setUsersRooms] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("jwt_token");
    if (token) {
      fetch("http://localhost:3000/profile", {
        headers: { Authentication: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.data);
          dispatch(setValue(result.data.attributes));
          setUsersRooms(result.data.attributes.rooms);
        });
    }
  }, []);
  const openChat = (id) => {
    fetch(`http://localhost:3000/rooms/${id}`)
      .then((response) => response.json())
      .then((result) => {
        dispatch(
          setRoomValue({
            room: result.data,
            users: result.data.attributes.users,
            messages: result.data.attributes.messages,
          })
        );
      });
    navigate(`/rooms/${id}`);
  };
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar usersRooms={usersRooms} openChat={openChat} />
        <Chat cableApp={cableApp} />
      </div>
    </div>
  );
}

export default App;
