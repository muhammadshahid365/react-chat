import { useEffect, useState } from 'react'
import ChatBox from './ChatBox'
import './index.css'
import NewMessage from './NewMessage'
import useWebSocket from 'react-use-websocket'
import Login from '../Login'

function ChatScreen() {
  const [messages, setMessages] = useState([])
  const [loginInfo, setLoginInfo] = useState({})
  const wsURL = 'ws://localhost:8000'

  const {
    sendMessage,
    lastMessage,
    sendJsonMessage,
    lastJsonMessage,
    getWebSocket
  } = useWebSocket(wsURL)

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessages(old => ([...old, {
        message: lastJsonMessage.message,
        user: 2
      }]))
    }
  }, [lastJsonMessage])

  if (!loginInfo.userId) {
    return <Login setLoginInfo={setLoginInfo} sendJsonMessage={sendJsonMessage} />
  }

  return (
    <div className='chat-screen'>
      <ChatBox messages={messages} />
      <NewMessage userId={loginInfo.userId} sendJsonMessage={sendJsonMessage} setMessages={setMessages} />
    </div>
  )
}

export default ChatScreen
