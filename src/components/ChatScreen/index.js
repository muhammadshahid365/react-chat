import { useEffect, useState, useContext } from 'react'
import ChatBox from './ChatBox'
import './index.css'
import NewMessage from './NewMessage'
import useWebSocket from 'react-use-websocket'
import Login from '../Login'
import { userContext } from '../../App'

function ChatScreen() {
  const [messages, setMessages] = useState([])
  const [loginInfo, setLoginInfo] = useContext(userContext)
  // const wsURL = 'ws://localhost:8000'
  // http://ec2-54-188-94-253.us-west-2.compute.amazonaws.com:8000/login
  const wsURL = 'ws://ec2-54-188-94-253.us-west-2.compute.amazonaws.com:8000'

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
