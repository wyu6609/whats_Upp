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
  const dispatch = useDispatch();
  let token = localStorage.getItem("jwt_token");
  function fetchProfile() {
    fetch("http://localhost:3000/profile", {
      headers: { Authentication: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch(setValue(result.data.attributes));
      });
  }
  useEffect(() => {
    let token = localStorage.getItem("jwt_token");
    if (token) {
      fetchProfile();
    }
  }, [])
    return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<ChatScreen cableApp={cableApp} />} />
      <Route
        exact
        path="/rooms/:id"
        element={currentUser ? <ChatScreen cableApp={cableApp} /> : navigate("/")}
      />
    </Routes>
  );
}
function ChatScreen({ cableApp }) {
  let navigate = useNavigate();

  const currentRoom = useSelector((state)=> state.room.value)
  //console.log(currentRoom)
  let token = localStorage.getItem("jwt_token");
  const [usersRooms, setUsersRooms] = useState([])

  const dispatch = useDispatch();
  function fetchProfile() {
    fetch("http://localhost:3000/profile", {
      headers: { Authentication: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch(setValue(result.data.attributes));
        setUsersRooms(result.data.attributes.rooms);
      });
  }
  useEffect(() => {
    let token = localStorage.getItem("jwt_token");
    if (token) {
      fetchProfile();
    }
  }, [])
  const openChat = (room) => {
    navigate(`/rooms/${room.id}`)
  };
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar usersRooms={usersRooms} openChat={openChat} fetchProfile={fetchProfile}/>
        <Chat cableApp={cableApp} />
      </div>
    </div>
  );
}

export default App;
