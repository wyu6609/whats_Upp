import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
const DropDownBtn = ({ usersRooms, openChat }) => {
  console.log(usersRooms);
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
      ></Dropdown.Toggle>

      <Dropdown.Menu>
        {usersRooms.map((room) => {
          return (
            <Dropdown.Item
              key={room.id}
              room={room}
              openChat={openChat}
              onClick={() => openChat(room)}
            >
              {room.name}
            </Dropdown.Item>
          );
        })}
        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownBtn;
