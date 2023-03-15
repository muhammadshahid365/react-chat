import React from 'react'

function Message({message, klass}) {
  return (
    <div>
      <span class='sender-name'>{message.username}</span>
      <div className={`message ${klass}`}>
        {message.message}
      </div>
    </div>
  )
}

export default Message
