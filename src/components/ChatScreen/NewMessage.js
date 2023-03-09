import { useState } from 'react'

function NewMessage({ sendJsonMessage, setMessages, user }) {
  const [message, setMessage] = useState('')
  
  const handleSendMessage = (e) => {
    e.preventDefault()
    if(message.trim().length > 0){
      sendJsonMessage({message, type: 'chat', user})
      setMessages(old => ([
        ...old,
        { message, user: 1 }
      ]))
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSendMessage} >
      <div className='new-message'>
          <input type='text' onChange={(e) => setMessage(e.target.value)} value={message} />
          <button type='submit' >SEND</button>
      </div>
    </form>
  )
}

export default NewMessage
