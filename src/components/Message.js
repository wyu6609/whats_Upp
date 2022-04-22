import { React, useEffect } from "react";
import { useSelector } from "react-redux";
function Message({ m, sender }) {
  //recieve audio

  //send audio

  const currentUser = useSelector((state) => state.user.value);
  let x = m.created_at.split("T")[1].split(".")[0];
  return (
    <div>
      <p className={`chat-message ${sender && "chat-receiver"}`}>
        <span className="chat-name">{m.sender_name}</span>
        {m.content}
        <span className="chat-timestamp">{x}</span>
      </p>
    </div>
  );
}

export default Message;
