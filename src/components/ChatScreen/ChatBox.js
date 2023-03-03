import React from 'react'
import Message from './Message'

function ChatBox({ messages }) {
  return (
    <div className='chat-box'>
      {
        messages.map(msg => (
          <Message message={msg.message} klass={msg.user === 1 ? 'first-chat' : 'second-chat'} />
        ))
      }
    </div>
  )
}

export default ChatBox
