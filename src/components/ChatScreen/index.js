import { useEffect, useState, useContext } from 'react'
import ChatBox from './ChatBox'
import './index.css'
import NewMessage from './NewMessage'
import useWebSocket from 'react-use-websocket'
import Login from '../Login'
import { userContext } from '../../App'
import baseURL from '../../config/endpoint'

function ChatScreen() {
  const [messages, setMessages] = useState([])
  const [loginInfo, setLoginInfo] = useContext(userContext)
  const wsURL = `ws://${baseURL}:8000`

  const {
    sendMessage,
    lastMessage,
    sendJsonMessage,
    lastJsonMessage,
    getWebSocket
  } = useWebSocket(wsURL, {
    onOpen: () => console.log('connected to Websocket...')
  })

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessages(old => ([...old, {
        message: lastJsonMessage.message,
        user: 2,
        username: lastJsonMessage.user.username
      }]))
    }
  }, [lastJsonMessage])

  if (!loginInfo.userId) {
    return <Login setLoginInfo={setLoginInfo} sendJsonMessage={sendJsonMessage} />
  }

  return (
    <div className='chat-screen'>
      <ChatBox messages={messages} />
      <NewMessage user={loginInfo} sendJsonMessage={sendJsonMessage} setMessages={setMessages} />
    </div>
  )
}

export default ChatScreen
