import React from 'react'

function Message({m}) {
  return (
    <div>
        <p className={`chat-message ${true && "chat-receiver"}`}>
          <span className="chat-name">Will Yu</span>
          {m.content}
          <span className="chat-timestamp">4:20pm</span>
        </p>
    </div>
  )
}

export default Message