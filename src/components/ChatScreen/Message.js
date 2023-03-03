import React from 'react'

function Message({message, klass}) {
  return (
    <div className={`message ${klass}`}>
      {message}
    </div>
  )
}

export default Message
